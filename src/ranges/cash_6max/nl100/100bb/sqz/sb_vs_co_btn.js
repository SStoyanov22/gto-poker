// SB vs CO+BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs CO+BTN",
  description: "SB faces CO raise + BTN call — 6-max, 100bb",
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
        '15bb': "[5.42749]6h5h, 6d5d, 6s5s, 6c5c[/5.42749], [18.1249]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/18.1249], [21.9203]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/21.9203], [23.1464]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/23.1464], [25.6533]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/25.6533], [28.235300000000002]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/28.235300000000002], [35.5816]Ah4h, Ad4d, As4s, Ac4c[/35.5816], [60.894999999999996]AhJh, AdJd, AsJs, AcJc[/60.894999999999996], [63.725]Th9h, Td9d, Ts9s, Tc9c[/63.725], [64.603]AhTh, AdTd, AsTs, AcTc[/64.603], [70.12620000000001]Ah5h, Ad5d, As5s, Ac5c[/70.12620000000001], [75.1929]KhQh, KdQd, KsQs, KcQc[/75.1929], [76.078]QhJh, QdJd, QsJs, QcJc[/76.078], [79.46560000000001]KhJh, KdJd, KsJs, KcJc[/79.46560000000001], [86.1651]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/86.1651], [89.89829999999999]QhTh, QdTd, QsTs, QcTc[/89.89829999999999], [93.32000000000001]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/93.32000000000001], [93.9504]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/93.9504], [99.0673]KhTh, KdTd, KsTs, KcTc[/99.0673], [99.16199999999999]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/99.16199999999999], [99.807]JhTh, JdTd, JsTs, JcTc[/99.807], [99.99860000000001]AhQh, AdQd, AsQs, AcQc[/99.99860000000001], [99.9999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs, AhKh, AdKd, AsKs, AcKc, JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/99.9999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs"
      },
      call: {
        '2.5bb': "[0.838037]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/0.838037], [0.93267]KhTh, KdTd, KsTs, KcTc[/0.93267], [3.24891]9h8h, 9d8d, 9s8s, 9c8c[/3.24891], [4.83408]Ah8h, Ad8d, As8s, Ac8c[/4.83408], [6.04411]Ah3h, Ad3d, As3s, Ac3c[/6.04411], [6.0495]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/6.0495], [6.67995]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/6.67995], [8.21692]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/8.21692], [9.95946]6h5h, 6d5d, 6s5s, 6c5c[/9.95946], [10.0885]7h6h, 7d6d, 7s6s, 7c6c[/10.0885], [10.0894]QhTh, QdTd, QsTs, QcTc[/10.0894], [11.7716]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/11.7716], [12.632399999999999]Kh9h, Kd9d, Ks9s, Kc9c[/12.632399999999999], [14.3131]5h4h, 5d4d, 5s4s, 5c4c[/14.3131], [15.104000000000001]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/15.104000000000001], [20.5344]KhJh, KdJd, KsJs, KcJc[/20.5344], [21.5705]Ah9h, Ad9d, As9s, Ac9c[/21.5705], [22.1171]Th9h, Td9d, Ts9s, Tc9c[/22.1171], [23.921799999999998]QhJh, QdJd, QsJs, QcJc[/23.921799999999998], [24.807000000000002]KhQh, KdQd, KsQs, KcQc[/24.807000000000002], [28.4236]Ah5h, Ad5d, As5s, Ac5c[/28.4236], [28.6194]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/28.6194], [32.2314]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/32.2314], [35.396]AhTh, AdTd, AsTs, AcTc[/35.396], [39.105000000000004]AhJh, AdJd, AsJs, AcJc[/39.105000000000004], [39.8761]Ah4h, Ad4d, As4s, Ac4c[/39.8761], [74.3467]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/74.3467], [76.8536]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/76.8536], [81.8751]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/81.8751]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
