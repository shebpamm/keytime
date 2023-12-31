import { useState } from "react";
import NotStarted from "./components/NotStarted";
import InProgress from "./components/InProgress";
import Results from "./components/Results";
import { invoke } from "@tauri-apps/api/tauri";
import { ConfigProvider } from "antd";
import "./App.css";

enum CollectionStatus {
  NotStarted,
  InProgress,
  Complete,
}

function App() {
  const [collectionStatus, setCollectionStatus] = useState(
    CollectionStatus.NotStarted,
  );
  const [data, setData] = useState({});

  const startCollecting = () => {
    invoke("start_collecting").then(() => {
      setCollectionStatus(CollectionStatus.InProgress);
    });
  };

  const stopCollecting = () => {
    invoke("stop_collecting").then((result: any) => {
      console.log(result);
      setCollectionStatus(CollectionStatus.Complete);
      setData(result);
    });
  };

  const currentComponent = () => {
    switch (collectionStatus) {
      case CollectionStatus.NotStarted:
        return <NotStarted handler={startCollecting} />;
      case CollectionStatus.InProgress:
        return <InProgress handler={stopCollecting} />;
      case CollectionStatus.Complete:
        return <Results restartHandler={startCollecting} data={data} />;
      default:
        return <NotStarted handler={startCollecting} />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Tabs: {
            // itemColor: "var(--color)",
            // horizontalItemSelectedColor: "var(--primary)",
            // colorBgContainer: "rgba(0, 0, 0, 0)",
            // titleFontSize: 20,
            itemActiveColor: "var(--primary)",
            itemHoverColor: "var(--primary)",
            itemColor: "var(--color)",
            itemSelectedColor: "var(--color)",
            titleFontSizeLG: 24,
            inkBarColor: "var(--primary)",
          },
        },
      }}
    >
      <div className="container">{currentComponent()}</div>
    </ConfigProvider>
  );
}

export default App;
