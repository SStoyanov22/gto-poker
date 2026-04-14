// SB vs UTG+HJ (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs UTG+HJ",
  description: "SB faces UTG raise + HJ call — 6-max, 100bb",
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
        '15bb': "[0.583094]7h6h, 7d6d, 7s6s, 7c6c[/0.583094], [0.8181930000000001]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/0.8181930000000001], [1.10926]Ah2h, Ad2d, As2s, Ac2c[/1.10926], [1.46394]8h7h, 8d7d, 8s7s, 8c7c[/1.46394], [2.19395]Kh6h, Kd6d, Ks6s, Kc6c[/2.19395], [12.7021]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/12.7021], [15.541599999999999]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/15.541599999999999], [17.8993]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/17.8993], [21.9922]5h4h, 5d4d, 5s4s, 5c4c[/21.9922], [23.5298]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/23.5298], [26.7239]QhJh, QdJd, QsJs, QcJc[/26.7239], [27.1793]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/27.1793], [28.6805]KhTh, KdTd, KsTs, KcTc[/28.6805], [33.665800000000004]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/33.665800000000004], [34.9227]6h5h, 6d5d, 6s5s, 6c5c[/34.9227], [51.8363]Ah4h, Ad4d, As4s, Ac4c[/51.8363], [55.9513]Ah5h, Ad5d, As5s, Ac5c[/55.9513], [61.9275]KhJh, KdJd, KsJs, KcJc[/61.9275], [63.1166]AhQh, AdQd, AsQs, AcQc[/63.1166], [79.77250000000001]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/79.77250000000001], [99.6302]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/99.6302], [99.9028]KhQh, KdQd, KsQs, KcQc[/99.9028], [99.9674]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.9674], [99.9902]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.9902], [99.99249999999999]AhKh, AdKd, AsKs, AcKc[/99.99249999999999], [99.9999]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/99.9999]"
      },
      call: {
        '2.5bb' : "[0.5114259999999999]Ah8h, Ad8d, As8s, Ac8c[/0.5114259999999999], [0.885556]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/0.885556], [1.19034]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/1.19034], [1.4809299999999999]AhTh, AdTd, AsTs, AcTc[/1.4809299999999999], [3.39465]Ah3h, Ad3d, As3s, Ac3c[/3.39465], [5.04441]8h7h, 8d7d, 8s7s, 8c7c[/5.04441], [6.05672]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/6.05672], [9.85439]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/9.85439], [11.9458]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/11.9458], [13.661499999999998]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/13.661499999999998], [14.4925]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/14.4925], [14.5103]Ah4h, Ad4d, As4s, Ac4c[/14.5103], [14.793999999999999]KhTh, KdTd, KsTs, KcTc[/14.793999999999999], [14.885200000000001]QhJh, QdJd, QsJs, QcJc[/14.885200000000001], [15.511]7h6h, 7d6d, 7s6s, 7c6c[/15.511], [18.6098]6h5h, 6d5d, 6s5s, 6c5c[/18.6098], [23.9131]KhJh, KdJd, KsJs, KcJc[/23.9131], [27.926499999999997]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/27.926499999999997], [28.779]5h4h, 5d4d, 5s4s, 5c4c[/28.779], [29.0727]Ah5h, Ad5d, As5s, Ac5c[/29.0727], [32.034]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/32.034], [34.1361]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/34.1361], [36.8819]AhQh, AdQd, AsQs, AcQc[/36.8819], [50.677099999999996]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/50.677099999999996], [65.2511]AhJh, AdJd, AsJs, AcJc[/65.2511], [72.8207]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/72.8207]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
