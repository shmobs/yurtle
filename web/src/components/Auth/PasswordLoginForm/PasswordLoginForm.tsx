import { Form } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { Button } from 'src/components/ui/button'
import PasswordField from 'src/components/ui/form/PasswordField'
import TextField from 'src/components/ui/form/TextField'

export interface IFormLogin {
  username: string
  password: string
}

interface IPasswordLoginFormProps {
  onComplete?: () => void
}

const PasswordLoginForm = ({ onComplete }: IPasswordLoginFormProps) => {
  const { logIn } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const onSubmit = async (data: IFormLogin) => {
    setLoading(true)
    const response = await logIn({ ...data })
    setLoading(false)

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome to Yurtle!')
      onComplete && onComplete()
    }
  }

  const usernameRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    // i couldn't figure out why, but this wasn't working without the setTimeout
    setTimeout(() => {
      usernameRef.current?.focus()
    })
  }, [usernameRef])

  return (
    <Form<IFormLogin> onSubmit={onSubmit} className="space-y-6">
      <TextField
        label="Username"
        name="username"
        placeholder="arimendelow"
        validation={{ required: true }}
      />

      <PasswordField
        label="Password"
        name="password"
        placeholder="••••••••"
        validation={{ required: true }}
      />

      <div className="flex justify-center">
        <Button disabled={loading}>Sign in</Button>
      </div>
    </Form>
  )
}

export default PasswordLoginForm
