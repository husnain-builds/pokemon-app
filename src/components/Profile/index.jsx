import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Cake as CakeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";
import axios from "axios";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
};

const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);
  const [details, setDetails] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const fetchUserDetails = async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) return;

  //   try {
  //     const res = await axios.get('http://localhost:5000/details', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     setDetails(res.data);
  //   } catch (error) {
  //     console.error('Error fetching user details:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    email: "alex.johnson@example.com",
    bio: "Passionate software engineer with 8+ years of experience in full-stack development. Specializing in React, Node.js, and cloud architecture.",
    joinDate: "Member since January 2020",
    avatar: "/placeholder.svg?height=150&width=150",
    coverPhoto: "/placeholder.svg?height=300&width=1200",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "AWS",
      "GraphQL",
      "MongoDB",
      "Docker",
    ],
    experience: [
      {
        id: 1,
        company: "Tech Innovations Inc.",
        role: "Senior Software Engineer",
        period: "2020 - Present",
        description:
          "Leading frontend development for enterprise applications.",
      },
      {
        id: 2,
        company: "Digital Solutions LLC",
        role: "Software Developer",
        period: "2017 - 2020",
        description:
          "Developed and maintained web applications using React and Node.js.",
      },
    ],
    education: [
      {
        id: 1,
        institution: "University of California, Berkeley",
        degree: "M.S. Computer Science",
        year: "2015 - 2017",
      },
      {
        id: 2,
        institution: "Stanford University",
        degree: "B.S. Computer Science",
        year: "2011 - 2015",
      },
    ],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description:
          "Built a scalable e-commerce platform with React, Node.js, and MongoDB.",
      },
      {
        id: 2,
        name: "Task Management App",
        description:
          "Developed a collaborative task management application with real-time updates.",
      },
      {
        id: 3,
        name: "Healthcare Analytics Dashboard",
        description:
          "Created an analytics dashboard for healthcare providers to visualize patient data.",
      },
    ],
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 2, sm: 3, md: 4 },
        mb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      {/* Cover Photo and Profile Header */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          mb: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: { xs: 120, sm: 150, md: 200 },
            backgroundImage: `url(${user.coverPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "primary.main",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-end" },
            p: { xs: 2, sm: 3 },
            pt: { xs: 0, md: 3 },
          }}
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{
              width: { xs: 80, sm: 100, md: 150 },
              height: { xs: 80, sm: 100, md: 150 },
              border: "4px solid white",
              mt: { xs: -40, sm: -50, md: -50 },
              boxShadow: 2,
            }}
          />

          <Box
            sx={{
              ml: { xs: 0, md: 3 },
              mt: { xs: 2, md: 0 },
              textAlign: { xs: "center", md: "left" },
              flexGrow: 1,
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Typography
              variant={isSmallMobile ? "h5" : "h4"}
              component="h1"
              gutterBottom
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
              }}
            >
              {details?.user?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {user.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: {
                  xs: "center",
                  sm: "flex-start",
                  md: "flex-start",
                },
                gap: { xs: 1, sm: 2 },
                mt: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationIcon fontSize="small" color="action" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 0.5, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {user.location}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon fontSize="small" color="action" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    ml: 0.5,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    wordBreak: "break-all",
                  }}
                >
                  {details?.user?.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            size={isSmallMobile ? "small" : "medium"}
            sx={{
              mt: { xs: 2, md: 0 },
              alignSelf: { xs: "center", md: "flex-start" },
              whiteSpace: "nowrap",
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>

      {/* Social Media Links */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 1, sm: 2 },
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Fab
          color="primary"
          aria-label="Facebook"
          size={isSmallMobile ? "small" : "medium"}
        >
          <FacebookIcon fontSize={isSmallMobile ? "small" : "medium"} />
        </Fab>
        <Fab
          color="primary"
          aria-label="Twitter"
          size={isSmallMobile ? "small" : "medium"}
        >
          <TwitterIcon fontSize={isSmallMobile ? "small" : "medium"} />
        </Fab>
        <Fab
          color="primary"
          aria-label="LinkedIn"
          size={isSmallMobile ? "small" : "medium"}
        >
          <LinkedInIcon fontSize={isSmallMobile ? "small" : "medium"} />
        </Fab>
        <Fab
          color="primary"
          aria-label="Instagram"
          size={isSmallMobile ? "small" : "medium"}
        >
          <InstagramIcon fontSize={isSmallMobile ? "small" : "medium"} />
        </Fab>
      </Box>

      {/* Profile Content */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Left Column - About */}
        <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
          <Card
            elevation={2}
            sx={{ mb: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                About
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                paragraph
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                {user.bio}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <WorkIcon
                  fontSize={isSmallMobile ? "small" : "medium"}
                  color="action"
                  sx={{ mr: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {user.title}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <SchoolIcon
                  fontSize={isSmallMobile ? "small" : "medium"}
                  color="action"
                  sx={{ mr: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Stanford University
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationIcon
                  fontSize={isSmallMobile ? "small" : "medium"}
                  color="action"
                  sx={{ mr: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {user.location}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CakeIcon
                  fontSize={isSmallMobile ? "small" : "medium"}
                  color="action"
                  sx={{ mr: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {user.joinDate}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            elevation={2}
            sx={{ mb: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {user.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size={isSmallMobile ? "small" : "medium"}
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                      mb: 0.5,
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Tabs Content */}
        <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
          <Card elevation={2} sx={{ borderRadius: 2, mb: { xs: 2, md: 0 } }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="profile tabs"
                variant="scrollable"
                scrollButtons="false"
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTab-root": {
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    minWidth: { xs: "auto", sm: 100 },
                    px: { xs: 1, sm: 2 },
                  },
                }}
              >
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "white",
                      outline: "none",
                      backgroundColor: "primary.main",
                    },
                  }}
                  label="Experience"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "white",
                      outline: "none",
                      backgroundColor: "primary.main",
                    },
                  }}
                  label="Education"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "white",
                      outline: "none",
                      backgroundColor: "primary.main",
                    },
                  }}
                  label="Projects"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              {user.experience.map((exp) => (
                <Box key={exp.id} sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    {exp.role}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
                  >
                    {exp.company} • {exp.period}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {exp.description}
                  </Typography>
                  {exp.id !== user.experience.length && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {user.education.map((edu) => (
                <Box key={edu.id} sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    {edu.institution}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
                  >
                    {edu.degree} • {edu.year}
                  </Typography>
                  {edu.id !== user.education.length && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {user.projects.map((project) => (
                <Box key={project.id} sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    {project.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {project.description}
                  </Typography>
                  {project.id !== user.projects.length && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
