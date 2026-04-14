// CO vs sqz HJ+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz HJ+SB",
  description: "CO called HJ, faces SB squeeze — 6-max, 100bb",
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
        '100bb': "[1.1400347]AhQh, AdQd, AsQs, AcQc[/1.1400347], [4.09831312]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/4.09831312], [6.42704729]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/6.42704729], [33.47554324]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/33.47554324]"
      },
      call: {
        '15bb': "[0.87134394]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/0.87134394], [2.45159702]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/2.45159702], [6.20733328]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/6.20733328], [7.503795169999999]7h6h, 7d6d, 7s6s, 7c6c[/7.503795169999999], [7.8598326400000005]Ah4h, Ad4d, As4s, Ac4c[/7.8598326400000005], [8.36582222]6h5h, 6d5d, 6s5s, 6c5c[/8.36582222], [8.69816363]KhTh, KdTd, KsTs, KcTc[/8.69816363], [9.24300203]5h4h, 5d4d, 5s4s, 5c4c[/9.24300203], [9.695781870000001]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/9.695781870000001], [9.78094781]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/9.78094781], [16.76513044]Ah5h, Ad5d, As5s, Ac5c[/16.76513044], [19.03063223]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/19.03063223], [21.23613356]AhQh, AdQd, AsQs, AcQc[/21.23613356], [27.422050529999996]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/27.422050529999996], [30.95058699]KhQh, KdQd, KsQs, KcQc[/30.95058699], [33.12385826]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/33.12385826], [34.63143348]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/34.63143348]"
       },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
