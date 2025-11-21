import React, { useState } from "react";
import {
    Box,
    Modal,
    IconButton,
    useMediaQuery,
    Theme,
    Button,
    Typography,
} from "@mui/material";
import {
    Close as CloseIcon,
    Download as DownloadIcon,
    ZoomIn as ZoomInIcon,
} from "@mui/icons-material";

interface DocumentViewerProps {
    imageUrl: string;
    alt: string;
    title?: string;
    showDownload?: boolean;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
    imageUrl,
    alt,
    title,
    showDownload = true,
}) => {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;

            // Extract filename from URL or use alt text
            const filename = imageUrl.split("/").pop() || alt || "document";
            link.download = filename.includes(".") ? filename : `${filename}.jpg`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download image:", error);
        }
    };

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    "&:hover .zoom-overlay": {
                        opacity: 1,
                    },
                }}
                onClick={handleOpen}
            >
                <img
                    src={imageUrl}
                    alt={alt}
                    width="100%"
                    style={{ borderRadius: 8, display: "block" }}
                    onError={(e) => {
                        console.error(`Failed to load ${alt} image:`, imageUrl);
                        (e.target as HTMLImageElement).style.display = "none";
                    }}
                />
                <Box
                    className="zoom-overlay"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        borderRadius: 2,
                    }}
                >
                    <ZoomInIcon sx={{ color: "white", fontSize: 40 }} />
                </Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        maxWidth: isMobile ? "95vw" : "90vw",
                        maxHeight: isMobile ? "95vh" : "90vh",
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 2,
                        outline: "none",
                    }}
                >
                    {/* Header with title and close button */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        {title && (
                            <Typography variant="h6" sx={{ flex: 1 }}>
                                {title}
                            </Typography>
                        )}
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {showDownload && (
                                <Button
                                    variant="contained"
                                    startIcon={<DownloadIcon />}
                                    onClick={handleDownload}
                                    size="small"
                                >
                                    Download
                                </Button>
                            )}
                            <IconButton onClick={handleClose} color="inherit">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Image container */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            maxHeight: isMobile ? "85vh" : "80vh",
                            overflow: "auto",
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={alt}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                borderRadius: 4,
                            }}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default DocumentViewer;

