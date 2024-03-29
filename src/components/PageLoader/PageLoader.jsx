import React from 'react'

export const PageLoader = () => {
    return (
        <>
            <div class="shadow rounded-md p-4 w-7/12 mx-auto mb-20 mt-2">
                <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-slate-200 h-16 w-16"></div>
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-3 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-3 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-3 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-3 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
