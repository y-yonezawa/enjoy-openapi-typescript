openapi-typescriptで遊ぶための最小構成です


下記のコマンド1つで環境構築が完了します。（Voltaが入っていない場合はNodeのバージョンによる差異が発生する可能性がありますが、大きな問題は出ないと思います）

```
npm install
```

型変換したいopenapi.jsonファイルをdocsディレクトリに入れます。（docs/openapi.json）

そして、次のコマンドで型生成を行います。

```
npm run generate-openapi
```

ここまで完了したら、`src/app/index.ts`で動作を確認してください。