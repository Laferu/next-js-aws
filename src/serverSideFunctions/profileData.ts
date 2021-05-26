export const profileData = async (sdk, accountId: string) => {
  try {
    const { data: profile } = await sdk.Profile.getProfile(accountId)

    return profile
  } catch (error) {
    return {
      data: {
        name: ''
      }
    }
  }
}
