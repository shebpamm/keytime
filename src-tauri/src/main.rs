// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rdev::{listen, Event, EventType, Key};
use std::collections::HashMap;
use std::sync::Mutex;
use std::thread;

use once_cell::sync::Lazy;

type TimingCollection = HashMap<Key, Vec<u128>>;
type MeasurementMap = HashMap<Key, u128>;

static TIMINGS: Lazy<Mutex<TimingCollection>> = Lazy::new(|| Mutex::new(HashMap::new()));
static MEASUREMENTS: Lazy<Mutex<MeasurementMap>> = Lazy::new(|| Mutex::new(HashMap::new()));
static STOP_THREAD: Lazy<Mutex<bool>> = Lazy::new(|| Mutex::new(false));

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![stop_collecting, start_collecting])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn stop_collecting() -> TimingCollection {
    let mut stop_thread = STOP_THREAD.lock().unwrap();
    *stop_thread = true;

    let timings = TIMINGS.lock().unwrap();
    
    println!("Timings: {:?}", timings);
    timings.clone()
}

#[tauri::command]
fn start_collecting() {
    let mut stop_thread = STOP_THREAD.lock().unwrap();
    *stop_thread = false;

    let mut timings = TIMINGS.lock().unwrap();
    timings.clear();

    let mut measurements = MEASUREMENTS.lock().unwrap();
    measurements.clear();

    thread::spawn(|| {
        listen(callback).unwrap();
    });
}

fn callback(event: Event) {
    let stop_thread = STOP_THREAD.lock().unwrap();
    if *stop_thread {
        return;
    }
    match event.event_type {
        EventType::KeyPress(key) => {
            let mut measurements = MEASUREMENTS.lock().unwrap();
            let now = std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_millis();
            measurements.entry(key).or_insert(now);
        }
        EventType::KeyRelease(key) => {
            let mut measurements = MEASUREMENTS.lock().unwrap();
            let now = std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_millis();

            let mut timings = TIMINGS.lock().unwrap();
            let key_timings = timings.entry(key).or_insert(Vec::new());

            if let Some(press_time) = measurements.get(&key) {
                let duration = now - press_time;
                key_timings.push(duration);
            }

            measurements.remove(&key);
        }
        _ => {}
    }
}
