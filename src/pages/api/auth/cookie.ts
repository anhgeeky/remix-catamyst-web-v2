import { supabase } from '@/lib'

/**
 * Just to set cookie in server-side, so it works with getServerSideProps.
 */
export default function authCookie(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}

/**
 * Example for usage later after the above api is fetched.
 */
// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req)

//   // If no user, redirect to index.
//   if (!user) {
//     return {
//       props: {},
//       redirect: { destination: '/', permanent: false },
//     }
//   }

//   // If there is a user, return it.
//   return {
//     props: { user },
//   }
// }
