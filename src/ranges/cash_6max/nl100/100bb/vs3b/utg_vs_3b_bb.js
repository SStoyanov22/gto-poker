// UTG vs 3b BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs 3b BB",
  description: "UTG faces 3-bet from BB — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '13bb': "",
      },
    },
    '2.25bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '13bb': "",
      },
    },
    '2.5bb': {
      raise: {
        '26bb': "[0.89812965]Kh7h, Kd7d, Ks7s, Kc7c[/0.89812965], [2.1517399999999998]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/2.1517399999999998], [2.7763]Ah4h, Ad4d, As4s, Ac4c[/2.7763], [7.66829]AhJh, AdJd, AsJs, AcJc[/7.66829], [8.50267]KhTh, KdTd, KsTs, KcTc[/8.50267], [8.77845]Ah6h, Ad6d, As6s, Ac6c[/8.77845], [8.9407]Ah8h, Ad8d, As8s, Ac8c[/8.9407], [11.1055]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/11.1055], [11.463099999999999]Ah7h, Ad7d, As7s, Ac7c[/11.463099999999999], [12.1692]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/12.1692], [13.9864]Ah9h, Ad9d, As9s, Ac9c[/13.9864], [16.93704434]Kh5h, Kd5d, Ks5s, Kc5c[/16.93704434], [20.6505]KhQh, KdQd, KsQs, KcQc[/20.6505], [21.3894]KhJh, KdJd, KsJs, KcJc[/21.3894], [23.7421]Ah3h, Ad3d, As3s, Ac3c[/23.7421], [35.1366]AhTh, AdTd, AsTs, AcTc[/35.1366], [37.0834]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/37.0834], [38.9356]Ah2h, Ad2d, As2s, Ac2c[/38.9356], [61.6213]AhKh, AdKd, AsKs, AcKc[/61.6213], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs",
        '100bb': "[43.8753]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/43.8753], [55.4182]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/55.4182]"
      },
      call: {
        '13bb': "[1.56574555]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/1.56574555], [2.1718702199999997]9h8h, 9d8d, 9s8s, 9c8c[/2.1718702199999997], [2.5064900000000003]Ah9h, Ad9d, As9s, Ac9c[/2.5064900000000003], [2.91268]Ah4h, Ad4d, As4s, Ac4c[/2.91268], [5.11567]KhTh, KdTd, KsTs, KcTc[/5.11567], [6.318]QhJh, QdJd, QsJs, QcJc[/6.318], [7.36521842]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/7.36521842], [12.742477329999998]8h7h, 8d7d, 8s7s, 8c7c[/12.742477329999998], [15.24545537]5h4h, 5d4d, 5s4s, 5c4c[/15.24545537], [17.1845]KhJh, KdJd, KsJs, KcJc[/17.1845], [19.0414]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/19.0414], [19.32232948]7h6h, 7d6d, 7s6s, 7c6c[/19.32232948], [21.57491749]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/21.57491749], [25.94946044]6h5h, 6d5d, 6s5s, 6c5c[/25.94946044], [27.146290420000003]Th9h, Td9d, Ts9s, Tc9c[/27.146290420000003], [28.439700000000002]JhTh, JdTd, JsTs, JcTc[/28.439700000000002], [28.93389593]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/28.93389593], [30.2367]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/30.2367], [32.412600000000005]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/32.412600000000005], [35.6776]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/35.6776], [36.230000000000004]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/36.230000000000004], [36.6296]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/36.6296], [38.3614]AhKh, AdKd, AsKs, AcKc[/38.3614], [46.2905]Ah5h, Ad5d, As5s, Ac5c[/46.2905], [56.6781]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/56.6781], [57.9778]AhTh, AdTd, AsTs, AcTc[/57.9778], [79.334]KhQh, KdQd, KsQs, KcQc[/79.334], [92.3308]AhJh, AdJd, AsJs, AcJc[/92.3308], AhQh, AdQd, AsQs, AcQc, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs",
      },
    },
    '3bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '13bb': "",
      },
    },
  }
}
