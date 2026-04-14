// HJ vs sqz CO+BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz CO+BTN",
  description: "HJ faces squeeze — CO called, BTN squeezed — 6-max, 100bb",
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
        '25bb': "[2.00061]Ah4h, Ad4d, As4s, Ac4c[/2.00061], [2.8176699999999997]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.8176699999999997], [5.59751]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/5.59751], [8.5505]AhJh, AdJd, AsJs, AcJc[/8.5505], [12.7074]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/12.7074], [16.6282]KhTh, KdTd, KsTs, KcTc[/16.6282], [21.7678]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/21.7678], [27.4595]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/27.4595], [30.3547]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/30.3547], [41.4172]AhTh, AdTd, AsTs, AcTc[/41.4172], [53.4606]Ah5h, Ad5d, As5s, Ac5c[/53.4606], [66.0718]AhQh, AdQd, AsQs, AcQc[/66.0718], [76.71940000000001]KhQh, KdQd, KsQs, KcQc[/76.71940000000001], [80.83930000000001]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/80.83930000000001], [81.6949]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/81.6949], [99.29639999999999]AhKh, AdKd, AsKs, AcKc[/99.29639999999999], [99.99940000000001]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/99.99940000000001]",
        '100bb': "[0.701816]AhKh, AdKd, AsKs, AcKc[/0.701816], [18.3051]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/18.3051], [68.0682]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/68.0682], [94.39070000000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/94.39070000000001]"
      },
      call: {
        '11bb': "[0.71055]AhJh, AdJd, AsJs, AcJc[/0.71055], [1.24457]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.24457], [2.77185]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.77185], [3.46982438]6h5h, 6d5d, 6s5s, 6c5c[/3.46982438], [4.4723]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/4.4723], [4.50707]KhJh, KdJd, KsJs, KcJc[/4.50707], [4.80794]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/4.80794], [5.8772049]5h4h, 5d4d, 5s4s, 5c4c[/5.8772049], [6.00734]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/6.00734], [10.5573]KhQh, KdQd, KsQs, KcQc[/10.5573], [19.1602]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/19.1602], [33.927]AhQh, AdQd, AsQs, AcQc[/33.927]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
