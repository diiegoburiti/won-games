import { screen } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helpers'

import TextContent from '.'

const props = {
  title: 'Gta v',
  content: `<h1>Description</h1>`
}

describe('<TextContent />', () => {
  it('should render the title and content', () => {
    const { container } = renderWithTheme(<TextContent {...props} />)

    expect(screen.getByRole('heading', { name: /gta v/i })).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /description/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render without title', () => {
    renderWithTheme(<TextContent content={props.content} />)

    expect(
      screen.queryByRole('heading', { name: /gta v/i })
    ).not.toBeInTheDocument()
  })

  it('should render with correctly background', () => {
    renderWithTheme(<TextContent {...props} />)

    const wrapper = screen.getByRole('heading', { name: /gta v/i })
      .parentElement

    expect(wrapper).toHaveStyle({
      color: `${theme.colors.white}` // theme.colors.white
    })

    expect(wrapper).toHaveStyleRule('color', `${theme.colors.black}`, {
      media: '(min-width: 768px)'
    })
  })
})
