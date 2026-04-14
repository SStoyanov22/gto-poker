// BTN vs sqz UTG+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz UTG+BB (RFI fold)",
  description: "BTN cold called UTG, faces BB squeeze, UTG folded — 6-max, 100bb",
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
        '100bb': "[7.33324083]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/7.33324083], [10.28695652]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/10.28695652], [48.80204743]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/48.80204743]"
      },
      call: {
        '15bb': "[1.29226096]KhJh, KdJd, KsJs, KcJc[/1.29226096], [1.72760725]JhTh, JdTd, JsTs, JcTc[/1.72760725], [2.43740424]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/2.43740424], [2.55744726]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/2.55744726], [4.91668239]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/4.91668239], [5.37640866]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/5.37640866], [5.79834079]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/5.79834079], [6.8331534099999995]AhTh, AdTd, AsTs, AcTc[/6.8331534099999995], [6.86483095]7h6h, 7d6d, 7s6s, 7c6c[/6.86483095], [7.2184228599999996]6h5h, 6d5d, 6s5s, 6c5c[/7.2184228599999996], [7.2324635200000005]Th9h, Td9d, Ts9s, Tc9c[/7.2324635200000005], [8.75081602]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/8.75081602], [9.41974348]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/9.41974348], [9.79607677]5h4h, 5d4d, 5s4s, 5c4c[/9.79607677], [10.40638471]Ah5h, Ad5d, As5s, Ac5c[/10.40638471], [11.32218114]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/11.32218114], [12.49731912]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/12.49731912], [15.67545917]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/15.67545917], [25.99110463]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/25.99110463], [27.611581680000004]AhJh, AdJd, AsJs, AcJc[/27.611581680000004], [33.6592]AhQh, AdQd, AsQs, AcQc[/33.6592], [37.35013133]KhQh, KdQd, KsQs, KcQc[/37.35013133]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
