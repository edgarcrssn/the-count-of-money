import { Modal, Select } from 'antd'
import React, { useState } from 'react'
import { Cryptocurrency } from '@prisma/client'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  cryptocurrencies: Cryptocurrency[]
}

export const TrackCryptocurrencyModal = ({ isOpen, setIsOpen, cryptocurrencies }: Props) => {
  const [value, setValue] = useState<string | null>(null)

  return (
    <Modal title="Tack a new cryptocurrency" centered open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
      <Select
        placeholder="New cryptocurrency to track"
        showSearch
        allowClear
        filterOption={(input: string, option?: { label: string; value: string }) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        value={value}
        options={cryptocurrencies.map((cryptocurrency) => ({
          label: cryptocurrency.name,
          value: cryptocurrency.id,
        }))}
        onChange={() => {}}
      />
    </Modal>
  )
}
