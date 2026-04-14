// UTG vs sqz SB+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs sqz SB+BB",
  description: "UTG faces squeeze — SB called, BB squeezed — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: "",
      call: "",
    },
    '2.25bb': {
      raise: "",
      call: "",
    },
    '2.5bb': {
      raise: {
        '24bb': "[0.649297]Ah9h, Ad9d, As9s, Ac9c[/0.649297], [1.43886]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/1.43886], [4.55836]Ah6h, Ad6d, As6s, Ac6c[/4.55836], [4.82328]Ah4h, Ad4d, As4s, Ac4c[/4.82328], [6.07607]Ah2h, Ad2d, As2s, Ac2c[/6.07607], [10.6473]KhQh, KdQd, KsQs, KcQc[/10.6473], [12.6387]KhJh, KdJd, KsJs, KcJc[/12.6387], [14.1846]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/14.1846], [14.435400000000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/14.435400000000001], [15.0425]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/15.0425], [16.329]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/16.329], [20.2632]Ah8h, Ad8d, As8s, Ac8c[/20.2632], [22.8247]Ah5h, Ad5d, As5s, Ac5c[/22.8247], [26.686500000000002]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/26.686500000000002], [31.5075]Ah7h, Ad7d, As7s, Ac7c[/31.5075], [37.948]KhTh, KdTd, KsTs, KcTc[/37.948], [41.0182]AhTh, AdTd, AsTs, AcTc[/41.0182], [62.266600000000004]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/62.266600000000004], [75.5664]AhKh, AdKd, AsKs, AcKc[/75.5664], [76.8303]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/76.8303]",
        '100bb': "[4.76965]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/4.76965], [18.2646]AhKh, AdKd, AsKs, AcKc[/18.2646], [34.9336]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/34.9336], [44.2158]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/44.2158]"
      },
      call: {
        '12bb': "[2.79974]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/2.79974], [6.16899]AhKh, AdKd, AsKs, AcKc[/6.16899], [6.767442009999999]8h7h, 8d7d, 8s7s, 8c7c[/6.767442009999999], [9.850716180000001]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/9.850716180000001], [14.65998419]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/14.65998419], [14.916699999999999]KhTh, KdTd, KsTs, KcTc[/14.916699999999999], [18.23629364]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/18.23629364], [19.17238611]7h6h, 7d6d, 7s6s, 7c6c[/19.17238611], [23.1697]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/23.1697], [23.19893473]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/23.19893473], [24.2857]JhTh, JdTd, JsTs, JcTc[/24.2857], [26.009944429999997]Th9h, Td9d, Ts9s, Tc9c[/26.009944429999997], [26.05959667]5h4h, 5d4d, 5s4s, 5c4c[/26.05959667], [26.710893499999997]6h5h, 6d5d, 6s5s, 6c5c[/26.710893499999997], [30.218]Ah4h, Ad4d, As4s, Ac4c[/30.218], [35.7114]AhTh, AdTd, AsTs, AcTc[/35.7114], [39.0142]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/39.0142], [41.348800000000004]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/41.348800000000004], [43.9786]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/43.9786], [46.7907]Ah5h, Ad5d, As5s, Ac5c[/46.7907], [48.603]KhJh, KdJd, KsJs, KcJc[/48.603], [53.996100000000006]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/53.996100000000006], [54.6313]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/54.6313], [80.1878]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/80.1878], [85.8152]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/85.8152], [89.00439999999999]KhQh, KdQd, KsQs, KcQc[/89.00439999999999], [92.9956]AhJh, AdJd, AsJs, AcJc[/92.9956], [99.99900000000001]AhQh, AdQd, AsQs, AcQc[/99.99900000000001]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
