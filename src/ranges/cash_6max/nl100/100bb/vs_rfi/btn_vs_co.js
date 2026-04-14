// BTN vs CO — Button 3-bet or call vs CO raise (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs CO",
  description: "Button 3-bet or call vs CO raise — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      call: {
        '2bb': "",
      },
    },
    '2.25bb': {
      call: {
        '2.25bb': "",
      },
    },
    '2.5bb': {
      raise: {
        '8bb': "[2.60886]8h7h, 8d7d, 8s7s, 8c7c[/2.60886], [3.3741800000000004]KhTd, KhTs, KhTc, KdTh, KdTs, KdTc, KsTh, KsTd, KsTc, KcTh, KcTd, KcTs[/3.3741800000000004], [5.07598]Kh7h, Kd7d, Ks7s, Kc7c[/5.07598], [8.2626]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/8.2626], [10.7967]Jh9h, Jd9d, Js9s, Jc9c[/10.7967], [19.776]AhTh, AdTd, AsTs, AcTc[/19.776], [20.8046]7h6h, 7d6d, 7s6s, 7c6c[/20.8046], [22.3854]6h5h, 6d5d, 6s5s, 6c5c[/22.3854], [22.9684]QhJd, QhJs, QhJc, QdJh, QdJs, QdJc, QsJh, QsJd, QsJc, QcJh, QcJd, QcJs[/22.9684], [23.9503]Th9h, Td9d, Ts9s, Tc9c[/23.9503], [25.1639]5h4h, 5d4d, 5s4s, 5c4c[/25.1639], [34.054899999999996]Kh8h, Kd8d, Ks8s, Kc8c[/34.054899999999996], [37.2774]AhTd, AhTs, AhTc, AdTh, AdTs, AdTc, AsTh, AsTd, AsTc, AcTh, AcTd, AcTs[/37.2774], [38.0796]Qh9h, Qd9d, Qs9s, Qc9c[/38.0796], [40.7557]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/40.7557], [40.8773]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/40.8773], [45.6542]KhTh, KdTd, KsTs, KcTc[/45.6542], [46.2153]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/46.2153], [47.7309]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/47.7309], [54.3652]QhJh, QdJd, QsJs, QcJc[/54.3652], [55.195499999999996]JhTh, JdTd, JsTs, JcTc[/55.195499999999996], [56.0871]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/56.0871], [56.470699999999994]KhJh, KdJd, KsJs, KcJc[/56.470699999999994], [62.8405]Ah9h, Ad9d, As9s, Ac9c[/62.8405], [64.6094]AhJh, AdJd, AsJs, AcJc[/64.6094], [66.9501]KhQh, KdQd, KsQs, KcQc[/66.9501], [67.0139]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/67.0139], [67.5716]QhTh, QdTd, QsTs, QcTc[/67.5716], [70.9455]Ah4h, Ad4d, As4s, Ac4c[/70.9455], [71.96390000000001]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/71.96390000000001], [79.5569]Ah8h, Ad8d, As8s, Ac8c[/79.5569], [80.3986]Ah5h, Ad5d, As5s, Ac5c[/80.3986], [83.2117]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/83.2117], [83.6525]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/83.6525], [86.6971]Kh9h, Kd9d, Ks9s, Kc9c[/86.6971], [87.3905]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/87.3905], [89.2392]Ah3h, Ad3d, As3s, Ac3c[/89.2392], [93.81620000000001]Ah7h, Ad7d, As7s, Ac7c[/93.81620000000001], [98.4723]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/98.4723], [99.8625]AhQh, AdQd, AsQs, AcQc[/99.8625], [99.8753]Ah6h, Ad6d, As6s, Ac6c[/99.8753], [99.9934]Ah2h, Ad2d, As2s, Ac2c[/99.9934], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs",
      },
      call: {
        '2.5bb': "[1.52773]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.52773], [2.54279]8h7h, 8d7d, 8s7s, 8c7c[/2.54279], [2.73924]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/2.73924], [4.50518]9h8h, 9d8d, 9s8s, 9c8c[/4.50518], [6.18382]Ah7h, Ad7d, As7s, Ac7c[/6.18382], [6.36516]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/6.36516], [8.741200000000001]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/8.741200000000001], [10.7608]Ah3h, Ad3d, As3s, Ac3c[/10.7608], [11.4525]7h6h, 7d6d, 7s6s, 7c6c[/11.4525], [12.6095]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/12.6095], [13.302900000000001]Kh9h, Kd9d, Ks9s, Kc9c[/13.302900000000001], [13.385]6h5h, 6d5d, 6s5s, 6c5c[/13.385], [14.0621]5h4h, 5d4d, 5s4s, 5c4c[/14.0621], [15.032100000000002]Th9h, Td9d, Ts9s, Tc9c[/15.032100000000002], [16.3475]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/16.3475], [16.7883]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/16.7883], [19.601399999999998]Ah5h, Ad5d, As5s, Ac5c[/19.601399999999998], [20.4431]Ah8h, Ad8d, As8s, Ac8c[/20.4431], [21.1847]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/21.1847], [29.0545]Ah4h, Ad4d, As4s, Ac4c[/29.0545], [32.4284]QhTh, QdTd, QsTs, QcTc[/32.4284], [32.9861]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/32.9861], [33.0499]KhQh, KdQd, KsQs, KcQc[/33.0499], [34.4924]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/34.4924], [35.3906]AhJh, AdJd, AsJs, AcJc[/35.3906], [37.1595]Ah9h, Ad9d, As9s, Ac9c[/37.1595], [43.5294]KhJh, KdJd, KsJs, KcJc[/43.5294], [43.9129]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/43.9129], [44.804500000000004]JhTh, JdTd, JsTs, JcTc[/44.804500000000004], [45.6348]QhJh, QdJd, QsJs, QcJc[/45.6348], [52.2691]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/52.2691], [53.784699999999994]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/53.784699999999994], [54.3458]KhTh, KdTd, KsTs, KcTc[/54.3458], [59.2443]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/59.2443], [80.22399999999999]AhTh, AdTd, AsTs, AcTc[/80.22399999999999]",
      },
    },
    '3bb': {
      call: {
        '3bb': "",
      },
    },
  }
}
