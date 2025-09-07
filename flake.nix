{
  description = "Ambiente de desenvolvimento com PHP e VSCode";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  
  outputs = { self, nixpkgs }: {
    devShells.x86_64-linux.default =
      let
        pkgs = import nixpkgs { 
          system = "x86_64-linux"; 
          config = { allowUnfree = true; }; 
        };
      in
      pkgs.mkShell {
        packages = [
          pkgs.php
          pkgs.phpExtensions.sqlite3
          pkgs.phpPackages.composer
          pkgs.sqlite
        ];


        shellHook = ''
          echo "Ambiente dev iniciado!"
          php -v
        '';
      };
  };
}
