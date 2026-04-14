// CO vs sqz UTG+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz UTG+BB (RFI fold)",
  description: "CO cold called UTG, faces BB squeeze, UTG folded — 6-max, 100bb",
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
        '100bb': "[4.9693391]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/4.9693391], [9.805535410000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/9.805535410000001], [15.91099292]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/15.91099292]"
      },
      call: {
        '15bb': "[0.8889009]8h7h, 8d7d, 8s7s, 8c7c[/0.8889009], [1.56354176]JhTh, JdTd, JsTs, JcTc[/1.56354176], [1.77751343]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/1.77751343], [2.4941518699999996]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/2.4941518699999996], [2.5347724499999997]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/2.5347724499999997], [2.8642377199999998]AhTh, AdTd, AsTs, AcTc[/2.8642377199999998], [3.76027476]7h6h, 7d6d, 7s6s, 7c6c[/3.76027476], [4.96430975]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/4.96430975], [5.35472092]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/5.35472092], [5.54729641]5h4h, 5d4d, 5s4s, 5c4c[/5.54729641], [5.54963221]Th9h, Td9d, Ts9s, Tc9c[/5.54963221], [5.59142687]Ah5h, Ad5d, As5s, Ac5c[/5.59142687], [6.09508368]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/6.09508368], [6.168601600000001]6h5h, 6d5d, 6s5s, 6c5c[/6.168601600000001], [6.90853744]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/6.90853744], [7.44576459]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/7.44576459], [8.85144652]KhJh, KdJd, KsJs, KcJc[/8.85144652], [10.37026048]AhJh, AdJd, AsJs, AcJc[/10.37026048], [11.01543265]KhQh, KdQd, KsQs, KcQc[/11.01543265], [16.2959609]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/16.2959609], [20.26072257]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/20.26072257], [36.7614]AhQh, AdQd, AsQs, AcQc[/36.7614]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
