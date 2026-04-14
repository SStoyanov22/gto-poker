// HJ vs sqz UTG+CO rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz UTG+CO (RFI fold)",
  description: "HJ cold called UTG, faces CO squeeze, UTG folded — 6-max, 100bb",
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
        '100bb': "[1.52763125]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.52763125], [12.875653309999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/12.875653309999999], [14.483162620000002]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/14.483162620000002]"
      },
      call: {
        '11bb': "[0.8158561]KhQh, KdQd, KsQs, KcQc[/0.8158561], [1.08257813]Ah5h, Ad5d, As5s, Ac5c[/1.08257813], [1.09697695]KhTh, KdTd, KsTs, KcTc[/1.09697695], [1.2168852000000001]JhTh, JdTd, JsTs, JcTc[/1.2168852000000001], [1.38494384]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.38494384], [1.5455091799999998]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.5455091799999998], [1.5987427799999998]Th9h, Td9d, Ts9s, Tc9c[/1.5987427799999998], [1.7982814]8h7h, 8d7d, 8s7s, 8c7c[/1.7982814], [2.43179547]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/2.43179547], [3.1409134499999998]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/3.1409134499999998], [3.85354175]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/3.85354175], [4.09777575]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/4.09777575], [4.1446837]7h6h, 7d6d, 7s6s, 7c6c[/4.1446837], [4.27901252]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/4.27901252], [4.74731815]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/4.74731815], [4.94087007]5h4h, 5d4d, 5s4s, 5c4c[/4.94087007], [5.2137272800000005]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/5.2137272800000005], [5.280812790000001]KhJh, KdJd, KsJs, KcJc[/5.280812790000001], [6.23993751]6h5h, 6d5d, 6s5s, 6c5c[/6.23993751], [14.37504856]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/14.37504856], [26.65339995]AhQh, AdQd, AsQs, AcQc[/26.65339995]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
