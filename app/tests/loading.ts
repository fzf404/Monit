import { useLoading } from '@/components/loading'

export default () => {
  const loading = useLoading({
    show: true,
    remark: 'Test Loading',
  })

  setInterval(() => {
    loading.show = !loading.show
  }, 2000)
}
