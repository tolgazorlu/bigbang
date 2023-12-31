export default function CheckoutSteps(props: {
    step1?: boolean
    step2?: boolean
    step3?: boolean
    step4?: boolean
  }) {
    return (
        <ul className="steps mb-8">
          <li className={props.step1 ? "step step-success" : "step"}>
            Login
          </li>
          <li className={props.step2 ? "step step-success" : "step"}>
            Shipping
          </li>
          <li className={props.step3 ? "step step-success" : "step"}>
            Payment
          </li>
          <li className={props.step4 ? "step step-success" : "step"}>
            Place Order
          </li>
        </ul>
    )
  }