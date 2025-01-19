import AppBar from './Appbar'

export interface AppLayoutProps {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  )
}

export default AppLayout
