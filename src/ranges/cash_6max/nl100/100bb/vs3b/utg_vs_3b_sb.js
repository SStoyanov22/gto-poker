// UTG vs 3b SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs 3b SB",
  description: "UTG faces 3-bet from SB — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '12bb': "",
      },
    },
    '2.25bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '12bb': "",
      },
    },
    '2.5bb': {
      raise: {
        '24bb': "[0.99129]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/0.99129], [1.24191]Ah6h, Ad6d, As6s, Ac6c[/1.24191], [1.2490899999999998]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.2490899999999998], [2.4325699999999997]Ah9h, Ad9d, As9s, Ac9c[/2.4325699999999997], [7.02865]Kh9h, Kd9d, Ks9s, Kc9c[/7.02865], [7.56042697]Kh5h, Kd5d, Ks5s, Kc5c[/7.56042697], [9.25253]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/9.25253], [10.1768]Ah3h, Ad3d, As3s, Ac3c[/10.1768], [10.5489]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/10.5489], [19.8348]Ah7h, Ad7d, As7s, Ac7c[/19.8348], [20.1791]Ah8h, Ad8d, As8s, Ac8c[/20.1791], [20.8343]Ah5h, Ad5d, As5s, Ac5c[/20.8343], [20.8763]KhQh, KdQd, KsQs, KcQc[/20.8763], [32.9718]AhJh, AdJd, AsJs, AcJc[/32.9718], [33.1809]KhTh, KdTd, KsTs, KcTc[/33.1809], [33.576]Ah4h, Ad4d, As4s, Ac4c[/33.576], [41.1171]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/41.1171], [44.3897]KhJh, KdJd, KsJs, KcJc[/44.3897], [96.8887]AhKh, AdKd, AsKs, AcKc[/96.8887], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs",
        '100bb': "[50.3429]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/50.3429], [56.5129]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/56.5129]"
      },
      call: {
        '12bb': "[3.1050500000000003]AhKh, AdKd, AsKs, AcKc[/3.1050500000000003], [7.19869102]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/7.19869102], [7.69176262]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/7.69176262], [8.540000000000001]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/8.540000000000001], [10.7016]KhTh, KdTd, KsTs, KcTc[/10.7016], [12.73633395]8h7h, 8d7d, 8s7s, 8c7c[/12.73633395], [13.0132]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/13.0132], [15.785800259999998]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/15.785800259999998], [19.3226]7h6h, 7d6d, 7s6s, 7c6c[/19.3226], [19.5227]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/19.5227], [25.46563571]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/25.46563571], [26.0664]5h4h, 5d4d, 5s4s, 5c4c[/26.0664], [26.720619839999998]6h5h, 6d5d, 6s5s, 6c5c[/26.720619839999998], [27.077099999999998]JhTh, JdTd, JsTs, JcTc[/27.077099999999998], [30.38411459]Th9h, Td9d, Ts9s, Tc9c[/30.38411459], [30.4969]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/30.4969], [31.3907]AhTh, AdTd, AsTs, AcTc[/31.3907], [33.0744]Ah5h, Ad5d, As5s, Ac5c[/33.0744], [34.909600000000005]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/34.909600000000005], [37.644]KhJh, KdJd, KsJs, KcJc[/37.644], [42.238]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/42.238], [66.3669]KhQh, KdQd, KsQs, KcQc[/66.3669], [66.97189999999999]AhJh, AdJd, AsJs, AcJc[/66.97189999999999], [89.275]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/89.275], AhQh, AdQd, AsQs, AcQc, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs",
      },
    },
    '3bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '12bb': "",
      },
    },
  }
}
