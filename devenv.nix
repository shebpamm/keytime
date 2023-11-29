{ pkgs, ... }:

let
  libraries = with pkgs; [
    webkitgtk
    gtk3
    cairo
    gdk-pixbuf
    glib
    dbus
    openssl_3
    librsvg
    at-spi2-atk.dev
    harfbuzz.dev
    clangStdenv
    llvmPackages_16.stdenv
    zlib
  ];
in
{
  packages = with pkgs; [
    pkg-config
    xorg.libX11
    xorg.libXcursor
    xorg.libXrandr
    xorg.libXi
    xorg.libXtst
    xorg.xorgproto

    curl
    wget
    pkg-config
    dbus
    openssl_3
    glib
    gtk3
    libsoup
    webkitgtk
    librsvg
    pango
  ] ++ libraries;

  languages.rust.enable = true;
  enterShell = ''
    export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:${pkgs.xorg.xorgproto}/share/pkgconfig
    export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath libraries}:$LD_LIBRARY_PATH
    export XDG_DATA_DIRS=${pkgs.gsettings-desktop-schemas}/share/gsettings-schemas/${pkgs.gsettings-desktop-schemas.name}:${pkgs.gtk3}/share/gsettings-schemas/${pkgs.gtk3.name}:$XDG_DATA_DIRS
  '';
}
