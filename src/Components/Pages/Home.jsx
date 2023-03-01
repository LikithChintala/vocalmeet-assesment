import React from 'react';
import { Typography, Paper, Grid, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2.5rem',
  textTransform: 'uppercase',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  margin: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#424242',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: '1rem',
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const GithubLink = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

function HomePage() {
  const applicant = {
    name: 'Sai Likith Chintala',
    skills: 'React, JavaScript, HTML, CSS',
    competencies: 'Coding,Debugging,Problem-solving, Communication, Teamwork',
    experience: '4+ years of experience as a ReactJS developer',
    gitLink: 'https://github.com/LikithChintala',
    image: 'https://rb.gy/9apn4u',
  };

  return (
    <StyledPaper elevation={3}>
      <StyledAvatar alt="Profile Image" src={applicant.image} />
      <Name>{applicant.name}</Name>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Skills</Typography>
          <Typography>{applicant.skills}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Competencies</Typography>
          <Typography>{applicant.competencies}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Experience</Typography>
          <Typography>{applicant.experience}</Typography>
        </Grid>
        <Grid item xs={12}>
          <GithubLink>
            <GitHubIcon/>
            <Typography
              component="a"
              href={applicant.gitLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ml: 1 }}
            >
              View GitHub Profile
            </Typography>
          </GithubLink>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}

export default HomePage;
