import { ReactNode, createContext, useState } from 'react'

interface ButtonContextType {
  buttonValueCartSide: boolean
  getButtonValue: (value: boolean) => void
}

export const ButtonCartSideContext = createContext({} as ButtonContextType)

interface ButtonCartSideContextProviderProps {
  children: ReactNode
}

export function ButtonCartSideProvider({
  children,
}: ButtonCartSideContextProviderProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [buttonValueCartSide, setButtonValueCartSide] = useState(false)

  const getButtonValue = (value: boolean) => {
    return setButtonValueCartSide(value)
  }

  return (
    <ButtonCartSideContext.Provider
      value={{
        buttonValueCartSide,
        getButtonValue,
      }}
    >
      {children}
    </ButtonCartSideContext.Provider>
  )
}
