const Settings = () => {
  return null
}

export default Settings

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/settings/edit-password"
    }
  }
}
