import Image from 'next/image'
import Button from 'components/Button'
import * as S from './styles'

export type HighlightProps = {
  title: string
  subTitle: string
  backgroundImage: string
  floatImage?: string
  buttonLabel: string
  buttonLink: string
  alignment?: 'right' | 'left'
}

const Highlight = ({
  title,
  subTitle,
  backgroundImage,
  floatImage,
  buttonLabel,
  buttonLink,
  alignment = 'right'
}: HighlightProps) => (
  <S.Wrapper alignment={alignment}>
    <Image src={backgroundImage} alt={`${title} background`} layout="fill" />
    {!!floatImage && (
      <S.FloatImage>
        <Image src={floatImage} alt={title} layout="fill" objectFit="cover" />
      </S.FloatImage>
    )}
    <S.Content>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subTitle}</S.SubTitle>
      <Button as="a" href={buttonLink}>
        {buttonLabel}
      </Button>
    </S.Content>
  </S.Wrapper>
)

export default Highlight
