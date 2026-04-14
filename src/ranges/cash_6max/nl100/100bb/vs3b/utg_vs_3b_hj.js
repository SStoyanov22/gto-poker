// UTG vs 3b HJ (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs 3b HJ",
  description: "UTG faces 3-bet from HJ — 6-max, 100bb",
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
        '22bb': "[0.84447607]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/0.84447607], [0.918661]Ah9h, Ad9d, As9s, Ac9c[/0.918661], [1.99024]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.99024], [2.13603]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/2.13603], [2.62276]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.62276], [4.93903]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/4.93903], [6.74324755]Kh6h, Kd6d, Ks6s, Kc6c[/6.74324755], [7.17777]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/7.17777], [9.143759999999999]Ah8h, Ad8d, As8s, Ac8c[/9.143759999999999], [9.59757]AhQh, AdQd, AsQs, AcQc[/9.59757], [11.3705]Kh9h, Kd9d, Ks9s, Kc9c[/11.3705], [12.2346]Ah7h, Ad7d, As7s, Ac7c[/12.2346], [16.5334]AhTh, AdTd, AsTs, AcTc[/16.5334], [19.0923]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/19.0923], [26.576100000000004]KhTh, KdTd, KsTs, KcTc[/26.576100000000004], [29.2615]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/29.2615], [29.6159]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/29.6159], [37.3188]Ah4h, Ad4d, As4s, Ac4c[/37.3188], [48.8989]Ah5h, Ad5d, As5s, Ac5c[/48.8989], [52.463]AhJh, AdJd, AsJs, AcJc[/52.463], [53.4744]KhQh, KdQd, KsQs, KcQc[/53.4744], [64.77969999999999]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/64.77969999999999], [68.1944]KhJh, KdJd, KsJs, KcJc[/68.1944], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc",
        '100bb': "[22.6666]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/22.6666], [35.2203]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/35.2203], [79.3001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/79.3001], ",
      },
      call: {
        '8bb': "[3.48749471]9h8h, 9d8d, 9s8s, 9c8c[/3.48749471], [6.92749]Ah4h, Ad4d, As4s, Ac4c[/6.92749], [7.5511800000000004]KhTh, KdTd, KsTs, KcTc[/7.5511800000000004], [11.984]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/11.984], [12.74552353]8h7h, 8d7d, 8s7s, 8c7c[/12.74552353], [18.7097]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/18.7097], [18.959]Ah5h, Ad5d, As5s, Ac5c[/18.959], [19.32258068]7h6h, 7d6d, 7s6s, 7c6c[/19.32258068], [19.33260623]Th9h, Td9d, Ts9s, Tc9c[/19.33260623], [19.912399999999998]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/19.912399999999998], [24.2787]AhTh, AdTd, AsTs, AcTc[/24.2787], [26.0664]5h4h, 5d4d, 5s4s, 5c4c[/26.0664], [26.720699999999997]6h5h, 6d5d, 6s5s, 6c5c[/26.720699999999997], [31.7435]JhTh, JdTd, JsTs, JcTc[/31.7435], [31.805]KhJh, KdJd, KsJs, KcJc[/31.805], [35.5473]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/35.5473], [36.81123215]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/36.81123215], [38.7406]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/38.7406], [38.80341301]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/38.80341301], [46.5139]KhQh, KdQd, KsQs, KcQc[/46.5139], [47.537]AhJh, AdJd, AsJs, AcJc[/47.537], [48.0719]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/48.0719], [48.5219]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/48.5219], [48.739900000000006]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/48.739900000000006], [80.9077]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/80.9077], [90.4024]AhQh, AdQd, AsQs, AcQc[/90.4024], ",
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
