// UTG vs sqz BTN+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs sqz BTN+SB",
  description: "UTG faces squeeze — BTN called, SB squeezed — 6-max, 100bb",
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
        '30bb': "[0.528827]KhJh, KdJd, KsJs, KcJc[/0.528827], [1.36490088]Kh5h, Kd5d, Ks5s, Kc5c[/1.36490088], [2.8008775900000003]Kh8h, Kd8d, Ks8s, Kc8c[/2.8008775900000003], [3.9835599999999998]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/3.9835599999999998], [4.50168]Ah8h, Ad8d, As8s, Ac8c[/4.50168], [6.67477]Kh9h, Kd9d, Ks9s, Kc9c[/6.67477], [8.49029856]Kh7h, Kd7d, Ks7s, Kc7c[/8.49029856], [26.9629]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/26.9629], [31.5027]KhTh, KdTd, KsTs, KcTc[/31.5027], [33.9047]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/33.9047], [47.5408]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/47.5408], [59.3635]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/59.3635], [59.4975]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/59.4975], [65.5349]AhKh, AdKd, AsKs, AcKc[/65.5349], [69.973]KhQh, KdQd, KsQs, KcQc[/69.973]",
        '100bb': "[5.89895]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/5.89895], [19.463900000000002]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/19.463900000000002], [19.5261]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/19.5261], [19.9492]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/19.9492], [23.8709]AhKh, AdKd, AsKs, AcKc[/23.8709], [38.8897]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/38.8897], [45.0814]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/45.0814]"
      },
      call: {
        '15bb': "[1.61278]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/1.61278], [7.376729999999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/7.376729999999999], [10.5934]AhKh, AdKd, AsKs, AcKc[/10.5934], [21.1726]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/21.1726], [46.5692]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/46.5692], [51.6313]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/51.6313], [97.682]AhQh, AdQd, AsQs, AcQc[/97.682]",
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
