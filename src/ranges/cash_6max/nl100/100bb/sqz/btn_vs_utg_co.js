// BTN vs UTG+CO (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs UTG+CO",
  description: "BTN faces UTG raise + CO call — 6-max, 100bb",
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
        '11bb': "[0.999373]Kh8h, Kd8d, Ks8s, Kc8c[/0.999373], [1.64675]Ah2h, Ad2d, As2s, Ac2c[/1.64675], [3.1554899999999995]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/3.1554899999999995], [6.09322]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/6.09322], [6.42098]Kh6h, Kd6d, Ks6s, Kc6c[/6.42098], [7.313649999999999]Kh9h, Kd9d, Ks9s, Kc9c[/7.313649999999999], [14.649899999999999]7h6h, 7d6d, 7s6s, 7c6c[/14.649899999999999], [15.1209]Ah6h, Ad6d, As6s, Ac6c[/15.1209], [15.4802]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/15.4802], [15.8545]Kh5h, Kd5d, Ks5s, Kc5c[/15.8545], [21.2569]AhTh, AdTd, AsTs, AcTc[/21.2569], [22.173399999999997]Ah7h, Ad7d, As7s, Ac7c[/22.173399999999997], [22.2593]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/22.2593], [23.7519]6h5h, 6d5d, 6s5s, 6c5c[/23.7519], [24.9524]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/24.9524], [25.7994]AhQh, AdQd, AsQs, AcQc[/25.7994], [26.6053]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/26.6053], [35.686800000000005]Ah3h, Ad3d, As3s, Ac3c[/35.686800000000005], [43.5828]AhJh, AdJd, AsJs, AcJc[/43.5828], [55.2366]KhTh, KdTd, KsTs, KcTc[/55.2366], [58.56980000000001]KhQh, KdQd, KsQs, KcQc[/58.56980000000001], [60.7694]Ah5h, Ad5d, As5s, Ac5c[/60.7694], [71.3138]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/71.3138], [74.1398]Ah4h, Ad4d, As4s, Ac4c[/74.1398], [79.0778]QhJh, QdJd, QsJs, QcJc[/79.0778], [81.6902]KhJh, KdJd, KsJs, KcJc[/81.6902], [90.5234]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/90.5234], [99.0693]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/99.0693], [99.9825]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.9825], [99.9993]AhKh, AdKd, AsKs, AcKc[/99.9993], [99.99980000000001]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.99980000000001], [99.9999]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/99.9999]"
      },
      call: {
        '2.5bb': "[0.861865]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/0.861865], [1.47275]5h3h, 5d3d, 5s3s, 5c3c[/1.47275], [2.55081]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/2.55081], [3.24025]Th9h, Td9d, Ts9s, Tc9c[/3.24025], [8.39406]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/8.39406], [8.401580000000001]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/8.401580000000001], [9.42122]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/9.42122], [10.2007]Ah3h, Ad3d, As3s, Ac3c[/10.2007], [16.278200000000002]6h4h, 6d4d, 6s4s, 6c4c[/16.278200000000002], [18.3089]KhJh, KdJd, KsJs, KcJc[/18.3089], [19.1599]JhTh, JdTd, JsTs, JcTc[/19.1599], [20.6919]QhJh, QdJd, QsJs, QcJc[/20.6919], [21.4541]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/21.4541], [25.840600000000002]Ah4h, Ad4d, As4s, Ac4c[/25.840600000000002], [26.3641]QhTh, QdTd, QsTs, QcTc[/26.3641], [28.9836]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/28.9836], [29.1205]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/29.1205], [29.780800000000003]7h6h, 7d6d, 7s6s, 7c6c[/29.780800000000003], [30.9606]6h5h, 6d5d, 6s5s, 6c5c[/30.9606], [37.4043]KhTh, KdTd, KsTs, KcTc[/37.4043], [39.204499999999996]Ah5h, Ad5d, As5s, Ac5c[/39.204499999999996], [39.6907]5h4h, 5d4d, 5s4s, 5c4c[/39.6907], [41.430099999999996]KhQh, KdQd, KsQs, KcQc[/41.430099999999996], [46.0405]AhTh, AdTd, AsTs, AcTc[/46.0405], [56.383799999999994]AhJh, AdJd, AsJs, AcJc[/56.383799999999994], [59.8639]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/59.8639], [68.0178]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/68.0178], [74.19930000000001]AhQh, AdQd, AsQs, AcQc[/74.19930000000001], [75.0476]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/75.0476], [77.7406]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/77.7406], [84.5197]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/84.5197]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
