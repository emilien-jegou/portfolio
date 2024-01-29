{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  nativeBuildInputs = [
    pkgs.buildPackages.nodejs-18_x
    pkgs.corepack
    pkgs.yarn
  ];
}

