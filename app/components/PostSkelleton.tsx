import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function PostSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4 p-4">
          <div className="h-1-block w-1-block bg-block-wool-white bg-gray-600 dark:bg-gray-700 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-[200px] slot bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-3 w-[100px] slot bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 mr-2">
        <div className="h-4 slot w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mr-2" />
        <div className="raised-slot-hover w-full h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mr-2" />
      </CardContent>
    </Card>
  )
}

