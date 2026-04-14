// BTN vs sqz SB+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz SB+BB",
  description: "BTN faces squeeze — SB called, BB squeezed — 6-max, 100bb",
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
        '26bb': "[1.4538499999999999]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/1.4538499999999999], [1.56227]Ah5h, Ad5d, As5s, Ac5c[/1.56227], [6.18991]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/6.18991], [6.534750000000001]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/6.534750000000001], [9.20666]KhTd, KhTs, KhTc, KdTh, KdTs, KdTc, KsTh, KsTd, KsTc, KcTh, KcTd, KcTs[/9.20666], [14.4896]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/14.4896], [16.166900000000002]Th9h, Td9d, Ts9s, Tc9c[/16.166900000000002], [19.3896]Kh5h, Kd5d, Ks5s, Kc5c[/19.3896], [19.5127]Kh9h, Kd9d, Ks9s, Kc9c[/19.5127], [20.408]AhQh, AdQd, AsQs, AcQc[/20.408], [20.8739]AhTd, AhTs, AhTc, AdTh, AdTs, AdTc, AsTh, AsTd, AsTc, AcTh, AcTd, AcTs[/20.8739], [21.7063]Ah4h, Ad4d, As4s, Ac4c[/21.7063], [27.5818]Kh8h, Kd8d, Ks8s, Kc8c[/27.5818], [28.4336]Ah2h, Ad2d, As2s, Ac2c[/28.4336], [35.774899999999995]Ah6h, Ad6d, As6s, Ac6c[/35.774899999999995], [38.7808]Ah8h, Ad8d, As8s, Ac8c[/38.7808], [41.2211]Ah3h, Ad3d, As3s, Ac3c[/41.2211], [41.8843]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/41.8843], [42.5471]Ah7h, Ad7d, As7s, Ac7c[/42.5471], [54.155]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/54.155], [58.670199999999994]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/58.670199999999994], [83.65169999999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/83.65169999999999], [84.62960000000001]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/84.62960000000001], AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs",
        '100bb': "[16.3483]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/16.3483], [16.558999999999997]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/16.558999999999997], [38.785599999999995]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/38.785599999999995], [62.1923]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/62.1923], "
      },
      call: {
        '12bb': "[4.85525]5h4h, 5d4d, 5s4s, 5c4c[/4.85525], [10.8186]9h8h, 9d8d, 9s8s, 9c8c[/10.8186], [15.3704]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/15.3704], [22.4854]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/22.4854], [23.3482]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/23.3482], [24.7708]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/24.7708], [26.154300000000003]6h5h, 6d5d, 6s5s, 6c5c[/26.154300000000003], [32.9988]8h7h, 8d7d, 8s7s, 8c7c[/32.9988], [36.3539]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/36.3539], [37.7909]Ah7h, Ad7d, As7s, Ac7c[/37.7909], [38.2484]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/38.2484], [42.0642]7h6h, 7d6d, 7s6s, 7c6c[/42.0642], [46.7248]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/46.7248], [50.223600000000005]Jh9h, Jd9d, Js9s, Jc9c[/50.223600000000005], [52.829899999999995]Ah4h, Ad4d, As4s, Ac4c[/52.829899999999995], [58.115700000000004]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/58.115700000000004], [61.2193]Ah8h, Ad8d, As8s, Ac8c[/61.2193], [65.95490000000001]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/65.95490000000001], [79.592]AhQh, AdQd, AsQs, AcQc[/79.592], [80.48729999999999]Kh9h, Kd9d, Ks9s, Kc9c[/80.48729999999999], [81.0343]Th9h, Td9d, Ts9s, Tc9c[/81.0343], [93.81009999999999]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/93.81009999999999], [98.43730000000001]Ah5h, Ad5d, As5s, Ac5c[/98.43730000000001], [99.9999]QhTh, QdTd, QsTs, QcTc, 6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/99.9999], KhQh, KdQd, KsQs, KcQc, AhJh, AdJd, AsJs, AcJc, KhJh, KdJd, KsJs, KcJc, QhJh, QdJd, QsJs, QcJc, AhTh, AdTd, AsTs, AcTc, KhTh, KdTd, KsTs, KcTc, JhTh, JdTd, JsTs, JcTc, Ah9h, Ad9d, As9s, Ac9c, 9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s, 7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
