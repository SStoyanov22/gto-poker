// CO vs sqz HJ+SB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz HJ+SB (RFI fold)",
  description: "CO cold called HJ, faces SB squeeze, HJ folded — 6-max, 100bb",
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
        '100bb': "[2.5510514]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/2.5510514], [4.03480326]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/4.03480326], [21.01935647]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/21.01935647]"
      },
      call: {
        '15bb': "[0.70938033]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/0.70938033], [0.9944147699999999]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/0.9944147699999999], [1.21703665]KhTh, KdTd, KsTs, KcTc[/1.21703665], [1.36975086]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.36975086], [1.39290897]Th9h, Td9d, Ts9s, Tc9c[/1.39290897], [1.5545286]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.5545286], [1.7444396899999999]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.7444396899999999], [1.9790085999999998]Ah5h, Ad5d, As5s, Ac5c[/1.9790085999999998], [2.4047367399999997]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/2.4047367399999997], [2.5472981900000002]7h6h, 7d6d, 7s6s, 7c6c[/2.5472981900000002], [3.2236200399999997]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/3.2236200399999997], [3.55570525]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/3.55570525], [3.5733017]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/3.5733017], [3.67256158]6h5h, 6d5d, 6s5s, 6c5c[/3.67256158], [3.8243645]KhJh, KdJd, KsJs, KcJc[/3.8243645], [4.36129859]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/4.36129859], [5.14067502]5h4h, 5d4d, 5s4s, 5c4c[/5.14067502], [13.310855899999998]AhJh, AdJd, AsJs, AcJc[/13.310855899999998], [18.5083482]KhQh, KdQd, KsQs, KcQc[/18.5083482], [22.15235719]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/22.15235719], [22.3854]AhQh, AdQd, AsQs, AcQc[/22.3854]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
