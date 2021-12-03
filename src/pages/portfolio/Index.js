import React from 'react'
import { useMoralis } from "react-moralis"
import moralis from "moralis"
import { Tab } from "@headlessui/react"
import Portfolio from './sub-components/Portfolio'
import History from './sub-components/History'
import SEO from '../../components/Seo'
import ThemedSuspense from '../../components/ThemedSuspense'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Index = () => {

  const {  isAuthenticated } =
  useMoralis();

  const [ allErcBalance, setGetAllErcBalance] = React.useState(null)

  const [ isLoading, setIsLoading ] = React.useState(false)

  const getAllErcz20 = async () => {
    setIsLoading(true)
    const response = await  moralis.Web3.getAllERC20();
   

    if(response){
      setIsLoading(false);
      setGetAllErcBalance(response)
    }
    
  }

  React.useEffect(() =>{
    if(isAuthenticated)getAllErcz20()
  },[isAuthenticated])

  if(isLoading) {
    return(
      <ThemedSuspense/>
    )
  }
    return (
      <>
      <SEO title="Port-Folio"/>
        <div className="w-full  px-2 py-16 sm:px-0">
     <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        <Tab className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium  rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-primary text-white shadow'
                    : 'text-blue-700 hover:bg-white/[0.12] hover:text-white'
                )
              }>Portfolio</Tab>
        <Tab className={({ selected }) =>
                             classNames(
                                'w-full py-2.5 text-sm leading-5 font-medium  rounded-lg',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                selected
                                  ? 'bg-primary text-white shadow'
                                  : 'text-blue-700 hover:bg-white/[0.12] hover:text-white'
                              )
              }>History</Tab>
    
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel><Portfolio  allErcBalance={allErcBalance}/></Tab.Panel>
        <Tab.Panel><History/></Tab.Panel>
       
      </Tab.Panels>
    </Tab.Group>
        </div>
        </>
    )
}

export default Index
