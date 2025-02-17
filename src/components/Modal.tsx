'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Button, SubmitButton } from './Button'
import { SelectField, TextField } from './Fields'

export default function Modal({
  formAction,
}: {
  formAction: (formData: FormData) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} color="slate">
        Demo now
      </Button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="my-3 sm:my-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Enter your details to get started
                </DialogTitle>
                <form
                  action={formAction}
                  className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
                >
                  <SelectField
                    className="col-span-full"
                    label="Industry"
                    name="industry"
                    required
                  >
                    <option>Accounting</option>
                    <option>Construction</option>
                    <option>Healthcare</option>
                    <option>Legal</option>
                    <option>Manufacturing</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </SelectField>
                  <SelectField
                    className="col-span-full"
                    label="Region"
                    name="region"
                    required
                  >
                    <option value="au">Australia</option>
                    <option value="us">United States</option>
                    <option value="eu">Europe</option>
                    <option value="other">Other</option>
                  </SelectField>
                  <div className="relative col-span-full">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-2 text-sm text-gray-500">
                        +
                      </span>
                    </div>
                  </div>
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
                  <div className="col-span-full">
                    <SubmitButton>
                      <span>
                        Let&apos;s go <span aria-hidden="true">&rarr;</span>
                      </span>
                    </SubmitButton>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
