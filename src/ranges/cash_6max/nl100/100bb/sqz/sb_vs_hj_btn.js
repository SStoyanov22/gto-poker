// SB vs HJ+BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs HJ+BTN",
  description: "SB faces HJ raise + BTN call — 6-max, 100bb",
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
        '15bb': "[2.84567]7h6h, 7d6d, 7s6s, 7c6c[/2.84567], [3.9064300000000003]Ah3h, Ad3d, As3s, Ac3c[/3.9064300000000003], [14.196200000000001]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/14.196200000000001], [14.4434]6h5h, 6d5d, 6s5s, 6c5c[/14.4434], [14.849100000000002]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/14.849100000000002], [17.9549]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/17.9549], [25.6714]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/25.6714], [26.1866]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/26.1866], [28.182000000000002]KhTh, KdTd, KsTs, KcTc[/28.182000000000002], [39.9354]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/39.9354], [52.7343]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/52.7343], [52.785000000000004]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/52.785000000000004], [60.4317]Ah5h, Ad5d, As5s, Ac5c[/60.4317], [64.6173]Ah4h, Ad4d, As4s, Ac4c[/64.6173], [69.44409999999999]AhJh, AdJd, AsJs, AcJc[/69.44409999999999], [71.23610000000001]JhTh, JdTd, JsTs, JcTc[/71.23610000000001], [82.4971]AhQh, AdQd, AsQs, AcQc[/82.4971], [95.2829]KhJh, KdJd, KsJs, KcJc[/95.2829], [97.3571]QhJh, QdJd, QsJs, QcJc[/97.3571], [99.78320000000001]KhQh, KdQd, KsQs, KcQc[/99.78320000000001], [99.9996]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/99.9996], [99.9999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/99.9999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs"
      },
      call: {
        '2.5bb': "[2.51878]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/2.51878], [2.64288]QhJh, QdJd, QsJs, QcJc[/2.64288], [3.19107]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/3.19107], [3.26678]Ah8h, Ad8d, As8s, Ac8c[/3.26678], [4.71697]KhJh, KdJd, KsJs, KcJc[/4.71697], [4.87543]Ah3h, Ad3d, As3s, Ac3c[/4.87543], [6.602429999999999]Ah9h, Ad9d, As9s, Ac9c[/6.602429999999999], [9.03931]9h8h, 9d8d, 9s8s, 9c8c[/9.03931], [12.4001]QhTh, QdTd, QsTs, QcTc[/12.4001], [12.557599999999999]7h6h, 7d6d, 7s6s, 7c6c[/12.557599999999999], [13.2769]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/13.2769], [17.5029]AhQh, AdQd, AsQs, AcQc[/17.5029], [17.6702]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/17.6702], [18.6246]6h5h, 6d5d, 6s5s, 6c5c[/18.6246], [20.6184]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/20.6184], [22.1644]5h4h, 5d4d, 5s4s, 5c4c[/22.1644], [24.1527]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/24.1527], [24.2772]JhTh, JdTd, JsTs, JcTc[/24.2772], [24.9247]Ah4h, Ad4d, As4s, Ac4c[/24.9247], [30.5559]AhJh, AdJd, AsJs, AcJc[/30.5559], [32.9027]KhTh, KdTd, KsTs, KcTc[/32.9027], [33.7832]Ah5h, Ad5d, As5s, Ac5c[/33.7832], [50.9779]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/50.9779], [61.6805]AhTh, AdTd, AsTs, AcTc[/61.6805], [73.8134]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/73.8134], [74.3286]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/74.3286], [85.8038]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/85.8038]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
