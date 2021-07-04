import { CartContextDefaultValues } from 'hooks/use-cart'
import { render, screen } from 'utils/test-utils'

import GameItem from '.'

const props = {
  id: '1',
  img: 'https://source.unsplash.com/user/willianjusten/151x70',
  title: 'Red Dead Redemption 2',
  price: 'R$ 215,00'
}

describe('<GameItem />', () => {
  it('should render GameItem correctly', () => {
    const { container } = render(<GameItem {...props} />)

    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()

    expect(screen.getByText(`${props.price}`)).toBeInTheDocument()

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render remove if the item is inside cart and call remove', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => true,
      removeFromCart: jest.fn()
    }

    render(<GameItem {...props} />, { cartProviderProps })

    //const removeLink = screen.getByText(/remove/i)
    expect(screen.getByText(/remove/i)).toBeInTheDocument()
  })

  it('should render the item with download link', () => {
    const downloadLink = 'https://link.com'

    render(<GameItem {...props} downloadLink={downloadLink} />)

    expect(
      screen.getByRole('link', { name: `Get ${props.title} here` })
    ).toHaveAttribute('href', downloadLink)
  })

  it('should render the payment info', () => {
    const paymentInfo = {
      flag: 'mastercard',
      img: '/img/master-card.png',
      number: '**** **** **** 4326',
      purchaseDate: 'Purchase made on 07/20/2020 at 20:32'
    }

    render(<GameItem {...props} paymentInfo={paymentInfo} />)

    expect(screen.getByRole('img', { name: paymentInfo.flag })).toHaveAttribute(
      'src',
      paymentInfo.img
    )

    expect(screen.getByText(paymentInfo.number)).toBeInTheDocument()
    expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument()
  })

  it('should render free game when theres no paymentInfo', () => {
    const paymentInfo = {
      flag: null,
      img: null,
      number: 'Free Game',
      purchaseDate: 'Purchase made on 07/20/2020 at 20:32'
    }

    render(<GameItem {...props} paymentInfo={paymentInfo} />)

    expect(screen.getByText(/free game/i)).toBeInTheDocument()
  })
})
