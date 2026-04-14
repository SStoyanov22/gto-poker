// BTN vs sqz HJ+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz HJ+BB",
  description: "BTN called HJ, faces BB squeeze — 6-max, 100bb",
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
        '100bb': "[3.3782465999999998]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/3.3782465999999998], [3.6743392299999997]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/3.6743392299999997], [17.06362019]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/17.06362019]"
      },
      call: {
        "15bb": "[1.06842013]5h4h, 5d4d, 5s4s, 5c4c[/1.06842013], [2.61830015]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/2.61830015], [3.3273807000000004]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/3.3273807000000004], [3.5425432399999996]6h5h, 6d5d, 6s5s, 6c5c[/3.5425432399999996], [9.144158580000001]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/9.144158580000001], [9.14594534]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/9.14594534], [11.658567490000001]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/11.658567490000001], [12.860820219999999]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/12.860820219999999], [14.69050616]AhJh, AdJd, AsJs, AcJc[/14.69050616], [18.486285520000003]AhQh, AdQd, AsQs, AcQc[/18.486285520000003], [19.95770556]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/19.95770556], [22.70592958]KhQh, KdQd, KsQs, KcQc[/22.70592958], [23.74748987]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/23.74748987], [33.11200632]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/33.11200632]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
