import { useLoading } from '~/app/hooks/component'

export default async () => {
  const loading = useLoading({
    show: true,
    remark: 'Test Loading',
  })

  setInterval(() => {
    loading.show = !loading.show
  }, 2000)
}
