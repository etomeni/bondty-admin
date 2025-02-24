import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';
import { useMerchantHook } from '@/hooks/merchants/useMerchantHook';
import ConfirmationDialog from '../ConfirmationDialog';


interface _Props {
    merchantId: string,
    merchantCaterory: string,
    is_suspended: boolean,
    is_deleted: boolean,
};


let dialogData = {
    action: () => {},
    title: '',
    description: '',
}

const MerchantTopOptionsComponent: React.FC<_Props> = ({
    merchantId, merchantCaterory, is_suspended, is_deleted
}) => {
    const navigate = useNavigate();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [isSuspended, setIsSuspended] = useState(is_suspended);
    const [isDeleted, setIsDeleted] = useState(is_deleted);

    const {
        // limitNo, setLimitNo,
        // currentPageNo, totalRecords,
        // apiResponse,

        isSubmitting,
        blockMerchant,
        deleteMerchant
    } = useMerchantHook();


    return (
        <Stack direction='row' gap='10px' flexWrap="wrap" mt={5}
            alignItems="center" justifyContent="space-between"
        >
            <Stack direction='row' gap='20px' alignItems="center">
                <Button variant="contained" size='small'
                    type="button"
                    onClick={() => {
                        setConfirmDialog(true);

                        dialogData = {
                            action: () => {
                                blockMerchant(
                                    merchantId,
                                    () => {
                                        setConfirmDialog(false);

                                        dialogData = {
                                            action: () => {
                                                setIsSuspended(!isSuspended);
                                            },
                                            // state: false,
                                            title: '',
                                            description: '',
                                        };
                                    }
                                );
                            },
                            title: 'Confirm',
                            description: 'Are you sure, you want to proceed with blocking this merchant?',
                        }
                    }}
                    
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "15px",
                        fontWeight: "400",
                        // lineHeight: 14.52px;
                    }}
                >{ isSuspended ? "Unblock" : "Block" } merchant </Button>

                {
                    isDeleted ? <Typography sx={{ color: "red" }}>
                        This merchant account has been deleted
                    </Typography>
                    : 
                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => {
                            setConfirmDialog(true);

                            dialogData = {
                                action: () => {
                                    deleteMerchant(
                                        merchantId,
                                        () => {
                                            setConfirmDialog(false);
                                            
                                            dialogData = {
                                                action: () => {
                                                    setIsDeleted(!isDeleted);
                                                },
                                                // state: false,
                                                title: '',
                                                description: '',
                                            };
                                        }
                                    );
                                },
                                title: 'Confirm',
                                description: 'Are you sure, you want to proceed with deleting this merchant?',
                            }
                        }}
                        
                        sx={{
                            ...themeBtnStyle,

                            bgcolor: kolors.secondary,
                            color: kolors.primary,

                            "&:hover": {
                                bgcolor: kolors.secondary,
                                color: kolors.primary
                            },
                            "&:active": {
                                bgcolor: kolors.primary,
                                color: "#fff"
                            },
                            "&:focus": {
                                bgcolor: kolors.secondary,
                                color: kolors.primary
                            },

                            fontSize: "15px",
                            fontWeight: "400",
                            // lineHeight: 14.52px;
                        }}
                    > Delete account </Button>
                }
            </Stack>

            <Box>
                <Typography 
                    onClick={() => {
                        navigate({
                            pathname: "/admin/merchant/pending-merchant-deatils",
                            search: `?${createSearchParams({ 
                                viewType: "credentials",
                                id: merchantId,
                                caterory: merchantCaterory
                            })}`,
                        });
                    }}
                    sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: kolors.primary,
                        cursor: "pointer",
                    }}
                >View Credentials</Typography>
            </Box>


            <ConfirmationDialog 
                actionYes={() => {
                    dialogData.action();
                }}
                isSubmitting={isSubmitting}
                openDialog={confirmDialog}
                setOpenDialog={setConfirmDialog}
                title='Confirm'
                description={dialogData.description}
                actionNo={() => {
                    setConfirmDialog(false);

                    dialogData = {
                        action: () => {},
                        // state: false,
                        title: '',
                        description: '',
                    };
                }}
            />
        </Stack>
    );
}

export default MerchantTopOptionsComponent;