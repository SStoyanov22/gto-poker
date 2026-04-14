// HJ vs sqz UTG+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz UTG+BB (RFI fold)",
  description: "HJ cold called UTG, faces BB squeeze, UTG folded — 6-max, 100bb",
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
        '100bb': "[0.73345243]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/0.73345243], [6.76153995]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/6.76153995], [7.398898399999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/7.398898399999999]"
      },
      call: {
        '15bb': "[0.8468936]KhTh, KdTd, KsTs, KcTc[/0.8468936], [1.32480117]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/1.32480117], [1.44842433]8h7h, 8d7d, 8s7s, 8c7c[/1.44842433], [1.93798465]JhTh, JdTd, JsTs, JcTc[/1.93798465], [2.5835103299999997]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.5835103299999997], [2.68994431]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/2.68994431], [2.8693810600000003]Th9h, Td9d, Ts9s, Tc9c[/2.8693810600000003], [3.12480415]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/3.12480415], [3.20563398]7h6h, 7d6d, 7s6s, 7c6c[/3.20563398], [3.49406233]5h4h, 5d4d, 5s4s, 5c4c[/3.49406233], [3.7942063800000003]AhTh, AdTd, AsTs, AcTc[/3.7942063800000003], [3.99263045]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/3.99263045], [5.18898037]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/5.18898037], [6.07635331]6h5h, 6d5d, 6s5s, 6c5c[/6.07635331], [6.8617016]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/6.8617016], [7.03841887]KhJh, KdJd, KsJs, KcJc[/7.03841887], [12.21371983]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/12.21371983], [12.46896005]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/12.46896005], [32.87083703]AhQh, AdQd, AsQs, AcQc[/32.87083703]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
