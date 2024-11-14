import { useNavigate } from 'react-router-dom'
import { pageRoutes } from '../routes'

export const useNavigateBackwards = () => {
  const navigate = useNavigate()

  const navigateBackwards = () => {
    const stackLength = history.length

    // If user came by url, not directly from the page
    if (stackLength <= 2) {
      navigate(pageRoutes.home)
    } else {
      navigate(-1)
    }
  }

  return navigateBackwards
}
