// HJ vs 3b BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs 3b BTN",
  description: "HJ faces 3-bet from BTN — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: {
        '24bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
    '2.25bb': {
      raise: {
        '24bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
    '2.5bb': {
      raise: {
        '22bb': "[2.10527474]Kh5h, Kd5d, Ks5s, Kc5c[/2.10527474], [3.98704]Ah8h, Ad8d, As8s, Ac8c[/3.98704], [4.25191]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/4.25191], [4.349425650000001]Kh6h, Kd6d, Ks6s, Kc6c[/4.349425650000001], [8.96225]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/8.96225], [10.9315]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/10.9315], [25.6679]KhQh, KdQd, KsQs, KcQc[/25.6679], [31.674799999999998]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/31.674799999999998], [35.0272]AhJh, AdJd, AsJs, AcJc[/35.0272], [35.4003]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/35.4003], [38.230599999999995]Kh9h, Kd9d, Ks9s, Kc9c[/38.230599999999995], [40.9523]Ah4h, Ad4d, As4s, Ac4c[/40.9523], [48.1519]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/48.1519], [55.6261]AhTh, AdTd, AsTs, AcTc[/55.6261], [68.2442]Ah5h, Ad5d, As5s, Ac5c[/68.2442], [70.9455]KhTh, KdTd, KsTs, KcTc[/70.9455], [74.1549]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/74.1549], [74.20020000000001]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/74.20020000000001], [82.64439999999999]KhJh, KdJd, KsJs, KcJc[/82.64439999999999], [99.99980000000001]AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.99980000000001], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs",
        '100bb': "[24.7452]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/24.7452], [40.6747]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/40.6747], ",
      },
      call: {
        '8bb': "[1.0546]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/1.0546], [4.61595]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/4.61595], [5.30989519]9h8h, 9d8d, 9s8s, 9c8c[/5.30989519], [7.91598]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/7.91598], [9.19741603]8h7h, 8d7d, 8s7s, 8c7c[/9.19741603], [11.1734]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/11.1734], [11.4017]Ah4h, Ad4d, As4s, Ac4c[/11.4017], [17.3556]KhJh, KdJd, KsJs, KcJc[/17.3556], [20.9838]QhTh, QdTd, QsTs, QcTc[/20.9838], [21.3246]Ah5h, Ad5d, As5s, Ac5c[/21.3246], [22.1784]Th9h, Td9d, Ts9s, Tc9c[/22.1784], [22.63750391]7h6h, 7d6d, 7s6s, 7c6c[/22.63750391], [24.856775719999998]6h5h, 6d5d, 6s5s, 6c5c[/24.856775719999998], [24.895500000000002]Ah9h, Ad9d, As9s, Ac9c[/24.895500000000002], [25.3135]QhJh, QdJd, QsJs, QcJc[/25.3135], [26.5157]5h4h, 5d4d, 5s4s, 5c4c[/26.5157], [27.0005]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/27.0005], [28.4041]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/28.4041], [29.0545]KhTh, KdTd, KsTs, KcTc[/29.0545], [41.7647]JhTh, JdTd, JsTs, JcTc[/41.7647], [44.3738]AhTh, AdTd, AsTs, AcTc[/44.3738], [50.1463]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/50.1463], [50.21276299]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/50.21276299], [52.5756]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/52.5756], [64.5997]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/64.5997], [64.97279999999999]AhJh, AdJd, AsJs, AcJc[/64.97279999999999], [68.3252]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/68.3252], [73.3495]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/73.3495], [74.3321]KhQh, KdQd, KsQs, KcQc[/74.3321], [83.8597]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/83.8597], AhQh, AdQd, AsQs, AcQc",
      },
    },
    '3bb': {
      raise: {
        '24bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
  }
}
