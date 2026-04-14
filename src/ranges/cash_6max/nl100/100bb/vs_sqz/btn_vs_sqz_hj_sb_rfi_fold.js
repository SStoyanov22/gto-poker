// BTN vs sqz HJ+SB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz HJ+SB (RFI fold)",
  description: "BTN cold called HJ, faces SB squeeze, HJ folded — 6-max, 100bb",
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
        '100bb': "[2.34751264]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/2.34751264], [2.54468636]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.54468636], [2.90235696]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/2.90235696], [3.12108018]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/3.12108018], [7.759927149999999]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/7.759927149999999], [28.47874321]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/28.47874321]"
      },
      call: {
        '15bb': "[0.75346628]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/0.75346628], [0.86037571]KhJh, KdJd, KsJs, KcJc[/0.86037571], [1.3796027100000001]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/1.3796027100000001], [2.42689066]Ah5h, Ad5d, As5s, Ac5c[/2.42689066], [2.5973345599999997]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/2.5973345599999997], [2.9512552899999998]Th9h, Td9d, Ts9s, Tc9c[/2.9512552899999998], [3.25384621]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/3.25384621], [3.6789526400000003]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/3.6789526400000003], [3.8438245500000003]7h6h, 7d6d, 7s6s, 7c6c[/3.8438245500000003], [4.07267266]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/4.07267266], [5.16405816]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/5.16405816], [5.81279745]6h5h, 6d5d, 6s5s, 6c5c[/5.81279745], [5.99748039]KhTh, KdTd, KsTs, KcTc[/5.99748039], [6.29101483]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/6.29101483], [7.752005469999999]5h4h, 5d4d, 5s4s, 5c4c[/7.752005469999999], [7.98912561]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/7.98912561], [14.41589023]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/14.41589023], [18.4888]AhQh, AdQd, AsQs, AcQc[/18.4888], [21.70335679]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/21.70335679], [30.557166730000002]AhJh, AdJd, AsJs, AcJc[/30.557166730000002], [39.71912578]KhQh, KdQd, KsQs, KcQc[/39.71912578]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
