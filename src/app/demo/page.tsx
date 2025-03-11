'use client'

import { SubmitButton } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { getOneTimeToken } from '@/app/actions'
import { Container } from '@/components/Container'
import { useCallback, useMemo, useState } from 'react'
import {
  ContentViewProps,
  useGo1ContentView,
} from '@go1/go1-embedding-react-sdk'

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

  const onGo1MessageReceived = useCallback(
    (message: any) => {
      if (message.type === 'ott_required') {
        setIsFormVisible(true)
      }
    },
    [setIsFormVisible],
  )

  const options = useMemo<ContentViewProps>(() => {
    return {
      env: 'staging',
      feature: 'search',
      portalURL: 'aphlab.qa.go1.cloud',
      onGo1MessageReceived,
    }
  }, [onGo1MessageReceived])

  const { sendMessageToGo1, ContentView } = useGo1ContentView(options)

  return (
    <Container className="relative h-[calc(100vh-225px)]">
      <ContentView />
      {isFormVisible && (
        <div className="absolute inset-0 bg-white px-8">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div>
              <h1 className="text-2xl font-bold">Request a demo</h1>
              <p className="text-lg text-gray-700">
                Fill out the form below to request a demo.
              </p>
            </div>
            <form
              action={(values) => {
                getOneTimeToken(values).then((token) => {
                  sendMessageToGo1({ type: 'pass_ott', payload: token })
                  setIsFormVisible(false)
                })
              }}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
            >
              <TextField
                label="First name"
                name="given_name"
                type="text"
                autoComplete="given-name"
                required
              />
              <TextField
                label="Last name"
                name="family_name"
                type="text"
                autoComplete="family-name"
                required
              />
              <TextField
                className="col-span-full"
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <TextField
                className="col-span-full"
                label="Company"
                name="company"
                type="text"
                autoComplete="email"
                required
              />
              <div className="col-span-full">
                <SubmitButton>
                  <span>
                    Let&apos;s go <span aria-hidden="true">&rarr;</span>
                  </span>
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </Container>
  )
}
