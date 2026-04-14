// BB vs UTG+HJ (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BB vs UTG+HJ",
  description: "BB faces UTG raise + HJ call — 6-max, 100bb",
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
        '15bb' : "[2.9587499999999998]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/2.9587499999999998], [3.16386]Kh7h, Kd7d, Ks7s, Kc7c[/3.16386], [4.92745]Kh9h, Kd9d, Ks9s, Kc9c[/4.92745], [6.44059]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/6.44059], [8.46726]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/8.46726], [9.114559999999999]Kh8h, Kd8d, Ks8s, Kc8c[/9.114559999999999], [11.062800000000001]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/11.062800000000001], [11.6666]5h4h, 5d4d, 5s4s, 5c4c[/11.6666], [12.8744]Kh5h, Kd5d, Ks5s, Kc5c[/12.8744], [13.0088]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/13.0088], [13.527800000000001]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/13.527800000000001], [16.2222]Qh9h, Qd9d, Qs9s, Qc9c[/16.2222], [19.165599999999998]8h7h, 8d7d, 8s7s, 8c7c[/19.165599999999998], [22.3835]QhTh, QdTd, QsTs, QcTc[/22.3835], [28.7319]QhJh, QdJd, QsJs, QcJc[/28.7319], [34.1142]Ah2h, Ad2d, As2s, Ac2c[/34.1142], [35.024300000000004]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/35.024300000000004], [36.498799999999996]7h6h, 7d6d, 7s6s, 7c6c[/36.498799999999996], [36.6524]Ah4h, Ad4d, As4s, Ac4c[/36.6524], [38.0362]6h5h, 6d5d, 6s5s, 6c5c[/38.0362], [45.2089]KhJh, KdJd, KsJs, KcJc[/45.2089], [46.2705]Ah5h, Ad5d, As5s, Ac5c[/46.2705], [46.9254]KhTh, KdTd, KsTs, KcTc[/46.9254], [54.3944]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/54.3944], [86.7985]AhQh, AdQd, AsQs, AcQc[/86.7985], [98.9697]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/98.9697], [99.6457]KhQh, KdQd, KsQs, KcQc[/99.6457], [99.6889]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.6889], [99.9762]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.9762], [99.9992]AhKh, AdKd, AsKs, AcKc[/99.9992], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs"
      },
      call: {
        '2.5bb': "[0.871599]4h3h, 4d3d, 4s3s, 4c3c[/0.871599], [11.098099999999999]Ah7h, Ad7d, As7s, Ac7c[/11.098099999999999], [13.2015]AhQh, AdQd, AsQs, AcQc[/13.2015], [23.4379]9h7h, 9d7d, 9s7s, 9c7c[/23.4379], [25.477]Ah2h, Ad2d, As2s, Ac2c[/25.477], [26.8403]Ah6h, Ad6d, As6s, Ac6c[/26.8403], [38.2739]8h6h, 8d6d, 8s6s, 8c6c[/38.2739], [40.3832]5h3h, 5d3d, 5s3s, 5c3c[/40.3832], [45.5133]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/45.5133], [46.2644]7h5h, 7d5d, 7s5s, 7c5c[/46.2644], [47.2924]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/47.2924], [47.5719]Th9h, Td9d, Ts9s, Tc9c[/47.5719], [51.9083]KhTh, KdTd, KsTs, KcTc[/51.9083], [53.692099999999996]Ah5h, Ad5d, As5s, Ac5c[/53.692099999999996], [54.729000000000006]KhJh, KdJd, KsJs, KcJc[/54.729000000000006], [54.74719999999999]Ah9h, Ad9d, As9s, Ac9c[/54.74719999999999], [58.374700000000004]Ah3h, Ad3d, As3s, Ac3c[/58.374700000000004], [61.9558]6h5h, 6d5d, 6s5s, 6c5c[/61.9558], [63.324400000000004]Ah4h, Ad4d, As4s, Ac4c[/63.324400000000004], [63.436099999999996]7h6h, 7d6d, 7s6s, 7c6c[/63.436099999999996], [70.14099999999999]8h7h, 8d7d, 8s7s, 8c7c[/70.14099999999999], [71.20450000000001]QhJh, QdJd, QsJs, QcJc[/71.20450000000001], [72.1831]QhTh, QdTd, QsTs, QcTc[/72.1831], [78.99040000000001]6h4h, 6d4d, 6s4s, 6c4c[/78.99040000000001], [79.66029999999999]9h8h, 9d8d, 9s8s, 9c8c[/79.66029999999999], [86.4721]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/86.4721], [86.9911]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/86.9911], [88.3332]5h4h, 5d4d, 5s4s, 5c4c[/88.3332], [88.9368]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/88.9368], [91.5325]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/91.5325], [92.00019999999999]Ah8h, Ad8d, As8s, Ac8c[/92.00019999999999], [93.55940000000001]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/93.55940000000001], [97.0399]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/97.0399], [97.8163]JhTh, JdTd, JsTs, JcTc[/97.8163], [99.1673]AhTh, AdTd, AsTs, AcTc[/99.1673], [99.2487]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/99.2487], [99.5637]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/99.5637], [99.9953]AhJh, AdJd, AsJs, AcJc[/99.9953], [99.9997]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/99.9997], [99.9999]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/99.9999]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
