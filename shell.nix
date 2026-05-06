{ pkgs ? import (fetchTarball {
    url = "https://channels.nixos.org/nixos-25.05/nixexprs.tar.xz";
  }) {} }:

pkgs.mkShell {
  nativeBuildInputs = [
    pkgs.just
    pkgs.nodejs_22
    pkgs.bun
    pkgs.nodePackages.concurrently
    pkgs.nodePackages.typescript-language-server
    pkgs.vscode-langservers-extracted
    pkgs.pnpm
    pkgs.poppler-utils

    # Add Nix's Chromium!
    pkgs.chromium 
  ];

  shellHook = ''
    # Tell Puppeteer to skip downloading Chrome
    export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

    # Point Puppeteer to the Nix-provided Chromium
    export PUPPETEER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"

    export PATH="$PWD/.packages/node_modules/.bin:$PATH"
  '';
}
