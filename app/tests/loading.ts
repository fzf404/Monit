import { useLoading } from '~/app/hooks/component'

export default () => {
  const loading = useLoading({
    show: true,
    remark: 'Test Loading',
  })

  setInterval(() => {
    loading.show = !loading.show
  }, 2000)
}
