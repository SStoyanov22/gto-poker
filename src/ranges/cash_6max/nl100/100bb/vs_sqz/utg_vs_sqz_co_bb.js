// UTG vs sqz CO+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs sqz CO+BB",
  description: "UTG faces squeeze — CO called, BB squeezed — 6-max, 100bb",
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
        '30bb': "[0.719619]Ah7h, Ad7d, As7s, Ac7c[/0.719619], [0.768657]AhKh, AdKd, AsKs, AcKc[/0.768657], [1.01972]Ah8h, Ad8d, As8s, Ac8c[/1.01972], [1.19404]Kh9h, Kd9d, Ks9s, Kc9c[/1.19404], [1.6175100000000002]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/1.6175100000000002], [1.62134]AhTh, AdTd, AsTs, AcTc[/1.62134], [1.6668100000000001]Ah9h, Ad9d, As9s, Ac9c[/1.6668100000000001], [2.89844]Ah2h, Ad2d, As2s, Ac2c[/2.89844], [3.79228]Ah4h, Ad4d, As4s, Ac4c[/3.79228], [6.545059999999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/6.545059999999999], [6.61325]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/6.61325], [7.02884]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/7.02884], [8.548680000000001]AhQh, AdQd, AsQs, AcQc[/8.548680000000001], [14.2429]KhJh, KdJd, KsJs, KcJc[/14.2429], [14.774799999999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/14.774799999999999], [26.814700000000002]Ah3h, Ad3d, As3s, Ac3c[/26.814700000000002], [40.4625]KhTh, KdTd, KsTs, KcTc[/40.4625], [70.8792]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/70.8792]",
        '100bb': "[1.26458]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/1.26458], [8.314449999999999]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/8.314449999999999], [40.0446]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/40.0446], [88.0493]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/88.0493], [91.18889999999999]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/91.18889999999999], [99.2313]AhKh, AdKd, AsKs, AcKc[/99.2313]"
      },
      call: {
        '15bb': "[1.35143003]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/1.35143003], [1.7822399999999998]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/1.7822399999999998], [3.4821890699999996]Th9h, Td9d, Ts9s, Tc9c[/3.4821890699999996], [5.3522921100000005]5h4h, 5d4d, 5s4s, 5c4c[/5.3522921100000005], [5.40562]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/5.40562], [6.47133197]7h6h, 7d6d, 7s6s, 7c6c[/6.47133197], [6.480658590000001]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/6.480658590000001], [7.650980000000001]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/7.650980000000001], [7.82232]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/7.82232], [10.354]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/10.354], [11.6752]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/11.6752], [11.9307]Ah5h, Ad5d, As5s, Ac5c[/11.9307], [14.119399999999999]KhQh, KdQd, KsQs, KcQc[/14.119399999999999], [15.50834691]6h5h, 6d5d, 6s5s, 6c5c[/15.50834691], [18.842]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/18.842], [20.8063]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/20.8063], [23.1213]KhJh, KdJd, KsJs, KcJc[/23.1213], [45.1806]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/45.1806], [90.1093]AhQh, AdQd, AsQs, AcQc[/90.1093]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
